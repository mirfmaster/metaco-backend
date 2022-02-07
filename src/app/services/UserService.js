const {
  user
} = require("../models");
const BaseService = require("./base/BaseService");

class UserService extends BaseService {
  constructor() {
    super({
      model: user
    });
  }
}

module.exports = new UserService();