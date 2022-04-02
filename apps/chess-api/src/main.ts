/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./db/lib/db.js');
const db = new Pool(dbParams);
db.connect();

//go get db queries to send along to routes

const dbUserQueries = require('./db/queries/user')(db);

//configure cookies

const cookieSession = require('cookie-session');

app.use(
  cookieSession({
    name: 'user',
    keys: ['key1', 'key2'],
  })
);

//test route

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to chess-api!' });
});

//middleware

const { authCheck } = require('./middleware/authCheck');

app.use((req, res, next) => {
  authCheck(req, res, next, dbUserQueries);
});

//user routes

const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes(dbUserQueries));

//initilize server on port

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
