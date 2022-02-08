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

const detailUser = async (req, res) => {
  const {
    app: {
      services: {
        UserService
      },
    },
  } = req;

  if (!req.params.id)
    return res.ext.badRequest("No profileId supplied");

  let result = await UserService.first({
    where: {
      id: req.params.id
    },
    association: ['team_members']
  });

  if (!result) return res.ext.notFound("No users found");

  res.send(result);
};

module.exports = {
  get: routeCallback(get),
  detailUser: routeCallback(detailUser),
};