const isUserLoggedIn = require("../helpers/isUserLoggedIn");

export function authCheck(req, res, next, dbQueries) {
  const userID = req.session.user_id; //get users cookie

  console.log("middleware working");

  isUserLoggedIn(userID, dbQueries)
    .then((isLoggedIn) => {
      if (!isLoggedIn) {
        req.isLoggedIn = false;
      } else {
        req.isLoggedIn = true;
        req.userID = userID;
      }
      next();
    })
    .catch((err) => {
      console.log("auth error:", err);
      res.status(500).json({
        auth: true,
        message: "internal server error",
      });
    });
}
