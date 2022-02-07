const {
  routeCallback
} = require("../../utils/router");

const get = async (req, res) => {
  const {
    app: {
      services: {
        TournamentService
      },
    },
  } = req;
  let result = await TournamentService.get();

  res.send(result);
};

module.exports = {
  get: routeCallback(get),
};