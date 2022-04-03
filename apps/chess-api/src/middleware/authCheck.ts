const isUserLoggedIn = require("../helpers/isUserLoggedIn");

export function authCheck(req, res, next, dbQueries) {
  const userID = req.session.user_id; //get users cookie

  isUserLoggedIn(userID, dbQueries)
    .then((isLoggedIn) => {
      if (!isLoggedIn) {
        req.isLoggedIn = false;
      } else {
        req.isLoggedIn = true;
        req.userID = userID;
      }
      return next();
    })
    .catch((err) => {
      console.log("auth error:", err);
      return res.status(500).json({
        auth: true,
        message: "internal server error",
      });
    });
}
