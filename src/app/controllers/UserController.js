const moment = require("moment");
const {
  Op
} = require("sequelize");
const yup = require("yup");
const {
  routeCallback
} = require("../../utils/router");


const get = async (req, res) => {
  const {
    parsedRequest,
    app: {
      services: {
        TeamService,
        UserService
      },
    },
    query: {
      search
    }
  } = req;
  let where = {};
  if (search) {
    where = {
      where: {
        name: {
          [Op.like]: `%${search}%`
        }
      },
    }
  }
  let result = await UserService.get({
    ...where,
    order: [
      ['coin', "DESC"]
    ]
  })
  res.send(result);
};

module.exports = {
  get: routeCallback(get),
};