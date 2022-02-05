const moment = require("moment");
const yup = require("yup");
const {
  routeCallback
} = require("../../utils/router");
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const get = async (req, res) => {
  const {
    app: {
      services: {
        TeamService
      },
    },
  } = req;
  let result = await TeamService.get();

  res.send(result);
};

module.exports = {
  get: routeCallback(get),
};