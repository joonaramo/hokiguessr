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
            resolve(results.map((result) => new this(result)));
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
            resolve(new this(result[0]));
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
              resolve(new this(results[0]));
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
}

module.exports = DBModel;
