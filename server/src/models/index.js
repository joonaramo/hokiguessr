const mysql = require('mysql');
const connection = require('../utils/connectDB');

class DBModel {
  static find(condition = true) {
    return new Promise((resolve, reject) => {
      let sql = mysql.format(
        `SELECT * FROM ${this.tableName} WHERE ?`,
        condition
      );
      sql = sql.replace(',', ' AND');
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.map((result) => new this(result)));
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
      sql = sql.replace(',', ' AND');
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
            resolve({ ...data, id: result.insertId });
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
   * Each time a db model object is called within JSON.stringify() function, this function will be fired (for example when res.json(object) is called)
   * Therefore, we can get rid of some unneeded fields when returning JSON from our backend
   * @returns
   */
  toJSON() {
    const data = { ...this };
    // Showing the tableName to user is useless
    delete data.tableName;
    // Definitely not smart to expose user's password hash
    if (data.password) {
      delete data.password;
    }
    return data;
  }
}

module.exports = DBModel;
