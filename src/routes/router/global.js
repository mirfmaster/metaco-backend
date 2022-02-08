const {
    Router
} = require("express");
const TeamsController = require("../../app/controllers/TeamsController");
const TournamentController = require("../../app/controllers/TournamentController");
const UserController = require("../../app/controllers/UserController");
const router = Router();

router.get('/teams', TeamsController.get);
router.get('/tournaments', TournamentController.get);
router.get('/users', UserController.get);
router.get('/users/:id', UserController.detailUser);

module.exports = router;