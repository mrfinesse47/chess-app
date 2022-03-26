const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // POST /api/users/login
  //-----------------------------------------------------------------

  router.post('/login', (req, res) => {
    res.json({
      auth: true,
      message: 'logged in',
    });
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
