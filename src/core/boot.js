const kernel = require("./kernel");
const routes = require("../routes");
const ErrorHandler = require("../core/supports/ErrorHandler");
const cron = require("node-cron");
const jobs = require("../app/jobs");
const { host, port } = kernel.locals.config.app;

kernel.use(routes);
kernel.use(ErrorHandler);

jobs.map((job) => {
  cron.schedule(job.schedule, job.callback);
});
console.log("jobs registered");

kernel.listen(port, () => {
  console.log(`App listening at ${host}:${port}`);
});

module.exports = kernel;
