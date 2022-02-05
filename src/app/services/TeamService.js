const {
  teams
} = require("../models");
const BaseService = require("./base/BaseService");

class TeamService extends BaseService {
  constructor() {
    super({
      model: teams
    });
  }
}

module.exports = new TeamService();