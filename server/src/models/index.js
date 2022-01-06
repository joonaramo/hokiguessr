const mysql = require('mysql');
const connection = require('../utils/connectDB');

function countRows(tableName, conditions = true) {
  return new Promise((resolve, reject) => {
    let sql = mysql.format(
      `SELECT COUNT(*) as total FROM ${tableName} WHERE ${conditions}`
    );
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].total);
      }
    });
  });
}

class DBModel {
  static find(condition, limit, offset = 0) {
    return new Promise((resolve, reject) => {
      // Parse find conditions to MySQL-friendly format
      let conditions = true;
      if (Object.keys(condition).length > 0) {
        conditions = Object.entries(condition);
        conditions = conditions.map((c) =>
          c.map((v) => (typeof v === 'string' ? `\`${v}\`` : v))
        );
        conditions = conditions.map((c) => c.join(' = '));
        conditions = conditions.join(' AND ');
      }

      // Limit and offset clause, if limit is not given, set to empty
      let limitOffset = '';

      if (limit) {
        limitOffset = `LIMIT ${limit} OFFSET ${offset}`;
      }

      let sql = mysql.format(
        `SELECT * FROM ${this.tableName} WHERE ${conditions} ORDER BY id DESC ${limitOffset}`
      );

      // console.log(sql);

      connection.query(sql, async (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const total = await countRows(this.tableName, conditions);
          const modelResults = results.map((result) => new this(result));
          resolve([total, modelResults]);
        }
      });
    });
  }
  static findById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else if (result.length === 0) {
            reject({ type: 'NOT_FOUND' });
          } else {
            const obj = new this(result[0]);
            resolve(obj);
          }
        }
      );
    });
  }
  static findOne(condition = true) {
    return new Promise((resolve, reject) => {
      let sql = mysql.format(
        `SELECT * FROM ${this.tableName} WHERE ?`,
        condition
      );
      // If given multiple conditions, seperate with AND instead of commas
      sql = sql.replace(/,/g, ' AND');
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            resolve(new this(results[0]));
          }
        }
      });
    });
  }
  static findByIdAndUpdate(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${this.tableName} SET ? WHERE id = ?`,
        [data, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            // Get updated row
            this.findById(id).then((res) => resolve(res));
          }
        }
      );
    });
  }
  static deleteById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM ${this.tableName} WHERE id = ?`,
        [id],
        (err, data) => {
          if (err) {
            reject(err);
          } else if (data.affectedRows === 0) {
            reject({ type: 'NOT_FOUND' });
          } else {
            resolve();
          }
        }
      );
    });
  }
  save() {
    const data = { ...this };
    delete data.tableName;
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO ${this.tableName} SET ? ON DUPLICATE KEY UPDATE ?`,
        [data, data],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (!this.id) {
              this.id = result.insertId;
            }
            resolve(this);
          }
        }
      );
    });
  }
  select(selector) {
    const data = { ...this };
    if (selector.includes('-')) {
      const toDelete = selector.split('-')[1];
      delete data[toDelete];
    }
    return data;
  }

  /**
   * Each time a db model object is called within JSON.stringify() function, this function will be fired
   * (for example when res.json(object) is called)
   * Therefore, we can get rid of some unneeded fields when returning JSON from our backend
   * @returns
   */
  toJSON() {
    const data = { ...this };
    // Showing the tableName is useless
    delete data.tableName;
    // Definitely not smart to expose user's password hash
    if (data.password) {
      delete data.password;
    }
    return data;
  }
}

module.exports = DBModel;
