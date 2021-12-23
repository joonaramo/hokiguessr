const DBModel = require('.');

class Player extends DBModel {
  static tableName = 'player';
  constructor(player) {
    super();
    const { player_id, points_ratio } = player;
    this.player_id = player_id;
    this.points_ratio = points_ratio;
    this.tableName = 'player';
  }
}

module.exports = Player;
