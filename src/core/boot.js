const kernel = require("./kernel");
const routes = require("../routes");
const ErrorHandler = require("../core/supports/ErrorHandler");
kernel.use(routes);
kernel.use(ErrorHandler);

kernel.listen(process.env.PORT || 3000, () => {
  console.log(`App listening at port :${process.env.PORT || 3000}`);
});

module.exports = kernel;