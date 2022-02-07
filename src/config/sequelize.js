var path = require('path');
var pathStorage = path.resolve('database.sqlite3')

module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": pathStorage
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory"
  },
  "production": {
    "dialect": "sqlite",
    "storage": pathStorage
  }
}