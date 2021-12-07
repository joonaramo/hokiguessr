const DBModel = require('.');

class Player extends DBModel {
  static tableName = 'player';
  constructor(player) {
    super();
    const { playerId, pointsRatio } = player;
    this.player_id = playerId;
    this.points_ratio = pointsRatio;
    this.tableName = 'player';
  }
}

module.exports = Player;
