const connection = require('../utils/connectDB');

class DBModel {
  static find(condition = true) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${this.tableName} WHERE ?`,
        [condition],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
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
            resolve(result[0]);
          }
        }
      );
    });
  }
  static findOne(condition = true) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM ${this.tableName} WHERE ?`,
        [condition],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length === 0) {
              resolve(null);
            } else {
              resolve(results[0]);
            }
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
        `INSERT INTO ${this.tableName} SET ?`,
        data,
        (err, { insertId }) => {
          if (err) {
            reject(err);
          } else {
            resolve({ ...data, id: insertId });
          }
        }
      );
    });
  }
}

module.exports = DBModel;
