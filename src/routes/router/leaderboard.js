const {
    Router
} = require("express");
const LeaderboardController = require("../../app/controllers/LeaderboardController");
const {
    validateRequest,
    mustHaveToken
} = require("../../app/middlewares");
const router = Router();

const routePrefix = '/leaderboard';

router.post(routePrefix, [validateRequest(LeaderboardController.createSchema)], LeaderboardController.post);
router.get(routePrefix, LeaderboardController.get);

module.exports = router;