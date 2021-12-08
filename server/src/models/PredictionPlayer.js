const DBModel = require('.');

class PredictionPlayer extends DBModel {
  static tableName = 'prediction_player';
  constructor(predictionPlayer) {
    super();
    const { predictionId, playerId } = predictionPlayer;
    this.prediction_id = predictionId;
    this.player_id = playerId;
    this.tableName = 'prediction_player';
  }
}

module.exports = PredictionPlayer;
