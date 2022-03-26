/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./db/lib/db.js');
const db = new Pool(dbParams);
db.connect();

//go get db queries to send along to routes

const dbUserQueries = require('./db/queries/user')(db);

//test route

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to chess-api!' });
});

const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes(dbUserQueries));

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
