const {
    Router
} = require("express");
const TeamsController = require("../../app/controllers/TeamsController");
const router = Router();

router.get('/teams', TeamsController.get);

module.exports = router;