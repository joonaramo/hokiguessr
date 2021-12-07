const DBModel = require('.');

class User extends DBModel {
  static tableName = 'user';
  constructor(user) {
    super();
    const { username, password, created_at, updated_at, points, is_admin } =
      user;
    this.username = username;
    this.password = password;
    this.points = points;
    this.is_admin = is_admin;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.tableName = 'user';
  }
}

module.exports = User;
