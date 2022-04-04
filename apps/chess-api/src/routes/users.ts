import { User } from "@chess/utils";

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // POST /api/users/login
  //-----------------------------------------------------------------

  router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
      const user = await db.getUserByEmail(req.body.email);

      if (!user) {
        return res.json({
          auth: false,
          message: "could not log in",
        });
      }
      if (req.body.password !== user.password) {
        //check the user password vs the form password
        return res.json({
          auth: false,
          message: "User information is incorrect",
        });
      }

      req.session.user_id = user.id;
      //sets the cookie for the client

      res.json({
        auth: true,
        message: "successfully logged in!",
      });
    } catch (err) {
      return res.status(500).json({
        auth: false,
        message: "Server Error",
      });
    }
  });

  //-----------------------------------------------------------------
  // POST /api/users/logout
  //-----------------------------------------------------------------

  router.post("/logout", (req, res) => {
    req.session = null; //deletes user cookies
    res.json({
      auth: false,
      message: "Goodbye!",
      severity: "success",
      isShown: true,
    });
  });

  //-----------------------------------------------------------------
  // /api/users/signup
  //-----------------------------------------------------------------

  router.post("/signup", (req, res) => {
    const user: User = {
      id: null, //db assigns the id on creation
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      rating: 1600,
      password: req.body.password,
    };

    //makes sure the sign up form is complete

    if (
      !(
        user.userName &&
        user.firstName &&
        user.lastName &&
        user.email &&
        user.password
      )
    ) {
      return res.json({
        auth: false,
        message: "Please fill in all required fields",
        isShown: true,
        severity: "error",
      });
    }

    //second thing is to check if the user is already logged in

    const { isLoggedIn } = req; //gets this from middleware

    if (isLoggedIn) {
      return res.json({
        auth: true,
        message: "already logged in",
      });
    }

    //if they arent logged in we can then go about creating a user

    db.addUser(user)
      .then((result) => {
        req.session.user_id = result.id; //set the cookie according to the userid returned from the database

        res.json({
          auth: true,
          message: "succesful registration",
          profile: result,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "23505") {
          return res.status(500).json({
            auth: false,
            message: "username or email already in use",
            err,
          });
        }
        return res.status(500).json({
          auth: false,
          message: "internal server error",
          err,
        });
      });
  });

  return router;
};
