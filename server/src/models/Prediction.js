const DBModel = require('.');

class Prediction extends DBModel {
  static tableName = 'prediction';
  constructor(prediction) {
    super();
    const {
      id,
      points_used,
      points_ratio,
      created_at,
      player_id,
      user_id,
      game_id,
      completed,
      completed_at,
      correct,
    } = prediction;
    this.id = id;
    this.points_used = points_used;
    this.points_ratio = points_ratio;
    this.created_at = created_at;
    this.player_id = player_id;
    this.user_id = user_id;
    this.game_id = game_id;
    this.completed_at = completed_at;
    this.completed = completed;
    this.correct = correct;
    this.tableName = 'prediction';
  }
}

module.exports = Prediction;
