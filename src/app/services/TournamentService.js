const {
  tournaments
} = require("../models");
const BaseService = require("./base/BaseService");

class TournamentService extends BaseService {
  constructor() {
    super({
      model: tournaments
    });
  }
}

module.exports = new TournamentService();