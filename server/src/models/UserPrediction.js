const DBModel = require('.');

class UserPrediction extends DBModel {
  static tableName = 'user_prediction';
  constructor(userPrediction) {
    super();
    const { userId, predictionId } = userPrediction;
    this.user_id = userId;
    this.prediction_id = predictionId;
    this.tableName = 'user_prediction';
  }
}

module.exports = UserPrediction;
