const DBModel = require('.');

class Prediction extends DBModel {
  static tableName = 'prediction';
  constructor(prediction) {
    super();
    const { pointsUsed, pointsRatio, created_at, userId } = prediction;
    this.points_used = pointsUsed;
    this.points_ratio = pointsRatio;
    this.created_at = created_at;
    this.user_id = userId;
    this.tableName = 'prediction';
  }
}

module.exports = Prediction;
