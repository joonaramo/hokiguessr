const DBModel = require('.');

class Goal extends DBModel {
  static tableName = 'goal';
  constructor(goal) {
    super();
    const { playerId, eventId, date } = goal;
    this.player_id = playerId;
    this.event_id = eventId;
    this.date = date;
    this.tableName = 'goal';
  }
}

module.exports = Goal;
