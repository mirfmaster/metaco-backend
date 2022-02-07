const moment = require("moment");
const yup = require("yup");
const {
  routeCallback
} = require("../../utils/router");
const {
  sequelize
} = require("../models");
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const createSchema = {
  team_id: yup.number()
    .required("Team ID is required!")
    .test("teams-validation", "Team is not found", async function (id) {
      if (!id) return false;
      const {
        TeamService
      } = this.options.context;
      let check = await TeamService.get({
        attributes: ["id"],
        where: {
          id,
        },
      });

      return check.length > 0;
    }),
  tournament_id: yup.number()
    .required("Tournament ID is required!")
    .test("tournament-validation", "Tournament is not found", async function (id) {
      if (!id) return false;
      const {
        TournamentService
      } = this.options.context;
      let check = await TournamentService.get({
        attributes: ["id"],
        where: {
          id,
        },
      });

      return check.length > 0;
    }),
  position: yup
    .mixed().oneOf(["1", "2", "3"], "Position is not valid")
    .required("Position is required"),
};

const get = async (req, res) => {
  const {
    parsedRequest,
    app: {
      services: {
        TeamService
      },
    },
    query: {
      search
    }
  } = req;
  let querySearch = "",
    replacements = [];


  if (search) {
    querySearch = " and (captain_name like ? or teams.name like ?)"
    replacements.push(`%${search}%`)
    replacements.push(`%${search}%`)
  }

  let result = await TeamService.querySelect(`select users.name as captain_name,teams.*, tournaments.title, (SELECT SUM(tr.point) FROM tournament_results as tr WHERE tr.team_id = teams.id) as total_point from teams, tournaments, users where users.id=teams.captain_id and teams.tournament_id=tournaments.id ${querySearch} order by total_point DESC limit 20`, replacements)

  res.send(result);
};


const post = async (req, res) => {
  const {
    app: {
      services: {
        TournamentResultService
      },
    },
    validated,
  } = req;
  const point = TournamentResultService.getPointByRank(validated.position)

  const data = await TournamentResultService.create({
    team_id: validated.team_id,
    tournament_id: validated.tournament_id,
    position: validated.position,
    point: point,
  })

  return res.ext.success("Tournament result successfully created", data)
};

module.exports = {
  createSchema,
  get: routeCallback(get),
  post: routeCallback(post),
};