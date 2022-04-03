import { User } from '@chess/utils';

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // POST /api/users/login
  //-----------------------------------------------------------------

  router.post('/login', async (req, res) => {
    try {
      const user = await db.getUserByEmail(req.body.email);

      if (!user) {
        return res.json({
          auth: false,
          message: 'could not log in',
        });
      }
      if (req.body.password !== user.password) {
        //check the user password vs the form password
        return res.json({
          auth: false,
          message: 'User information is incorrect',
        });
      }

      req.session.user_id = user.id;
      //sets the cookie for the client

      res.json({
        auth: true,
        message: 'successfully logged in!',
      });
    } catch (err) {
      return res.status(500).json({
        auth: false,
        message: 'Server Error',
      });
    }
  });

  //-----------------------------------------------------------------
  // POST /api/users/logout
  //-----------------------------------------------------------------

  router.post('/logout', (req, res) => {
    req.session = null; //deletes user cookies
    res.json({
      auth: false,
      message: 'Goodbye!',
      severity: 'success',
      isShown: true,
    });
  });

  //-----------------------------------------------------------------
  // /api/users/signup
  //-----------------------------------------------------------------

  router.post('/signup', (req, res) => {
    const user = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      address: 'placeholder', //will remove placeholders shortly when reseeded db
      neighborhood: 'placeholder',
      borrower: false, //not sent by axios
      lender: false, //not sent by axios
      email: req.body.email,
      cash_balance_cents: 0, //not sent along  by axios
      phone: 1,
      password: req.body.password,
    };

    //makes sure the sign up form is complete

    if (!(user.first_name && user.last_name && user.email && user.password)) {
      return res.json({
        auth: false,
        message: 'Please fill in all required fields',
        isShown: true,
        severity: 'error',
      });
    }

    //second thing is to check if the user is already logged in

    const { isLoggedIn } = req; //gets this from middleware

    if (isLoggedIn) {
      return res.json({
        auth: true,
        message: 'already logged in',
      });
    }

    //if they arent logged in we can then go about creating a user

    db.addUser(user)
      .then((result) => {
        if (!result) {
          return res.json({
            auth: false,
            message: 'Email already in use',
          });
        }

        req.session.user_id = result.id; //set the cookie according to the userid returned from the database

        res.json({
          auth: true,
          message: 'succesful registration',
          profile: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: false,
          message: 'internal server error',
        });
      });
  });

  return router;
};
