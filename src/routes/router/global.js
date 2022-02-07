const {
    Router
} = require("express");
const TeamsController = require("../../app/controllers/TeamsController");
const TournamentController = require("../../app/controllers/TournamentController");
const router = Router();

router.get('/teams', TeamsController.get);
router.get('/tournaments', TournamentController.get);

module.exports = router;