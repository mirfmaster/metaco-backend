const {
  tournament_results
} = require("../models");
const BaseService = require("./base/BaseService");

class TournamentResultService extends BaseService {
  constructor() {
    super({
      model: tournament_results
    });
  }
  pointByRank = {
    1: 5,
    2: 3,
    3: 2
  }

  getPointByRank(rank) {
    return this.pointByRank[rank]
  }
}

module.exports = new TournamentResultService();