import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import configuration from './config/config.js';
import games from './config/routes/games';
import users from './config/routes/users.js';
import matches from './config/routes/matches.js';
import cors, { origins } from 'universal-cors'

var env = process.env.NODE_ENV || 'development';
var config = configuration[env];

// Connect to MongoDB
mongoose.connect(`mongodb://${config.database.host}/${config.database.db}`);

// Initialize http server
const app = express();

// Prettify JSON
app.set('json spaces', 3);

// Logger that outputs all requests into the console
if ((env != 'test') && (env != 'prodTest')) {
  app.use(morgan('combined'));
}

/** cors middleware to accept any pattern matching example.com subdomains */
app.use(cors({ patterns: [ /^.*/ ]}))

//Middleware to set the general routing
app.use('/users', users);
app.use('/games',games);
app.use('/matches', matches);

const server = app.listen(config.server.port, config.server.host, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

export default app;
