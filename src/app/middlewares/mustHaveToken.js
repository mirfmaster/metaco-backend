// const jwt = require("jsonwebtoken");

// const mustHaveToken = (roles) => async (req, res, next) => {
//   const token = req.headers["hoi-authorization"] || null;
//   if (!token) return res.ext.unauthorized();
//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//     if (!roles.includes(decoded.type) && roles != "*") {
//       return res.ext.forbidden();
//     }

//     req.user = decoded;
//     return next();
//   } catch (error) {
//     return res.ext.error(error.message, error.statusCode);
//   }
// };

// module.exports = mustHaveToken;
