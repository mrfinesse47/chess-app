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

  return router;
};
