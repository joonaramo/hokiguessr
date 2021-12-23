const DBModel = require('.');

class Goal extends DBModel {
  static tableName = 'goal';
  constructor(goal) {
    super();
    const { player_id, event_id, date } = goal;
    this.player_id = player_id;
    this.event_id = event_id;
    this.date = date;
    this.tableName = 'goal';
  }
}

module.exports = Goal;
