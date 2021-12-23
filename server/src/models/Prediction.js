const DBModel = require('.');

class Prediction extends DBModel {
  static tableName = 'prediction';
  constructor(prediction) {
    super();
    const { points_used, points_ratio, created_at, player_id, user_id } =
      prediction;
    this.points_used = points_used;
    this.points_ratio = points_ratio;
    this.created_at = created_at;
    this.player_id = player_id;
    this.user_id = user_id;
    this.tableName = 'prediction';
  }
}

module.exports = Prediction;
