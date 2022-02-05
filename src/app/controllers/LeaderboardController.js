const moment = require("moment");
const yup = require("yup");
const {
  routeCallback
} = require("../../utils/router");
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
    .mixed().oneOf([1, 2, 3], "Position is not valid")
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
  } = req;

  let result = await TeamService.get({
    ...parsedRequest,
    include: [{
      association: 'tournament_results',
      attributes: ['point']
    }, {
      association: 'captain',
      attributes: ['name']
    }]
  });


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