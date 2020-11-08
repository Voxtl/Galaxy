// Load NPM modules
import { config } from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initalise .env
config();

// Welcome message
console.log('  _______      ___       __          ___      ___   ___ ____    ____ ');
console.log(' /  _____|    /   \\     |  |        /   \\     \\  \\ /  / \\   \\  /   / ');
console.log('|  |  __     /  ^  \\    |  |       /  ^  \\     \\  V  /   \\   \\/   /  ');
console.log('|  | |_ |   /  /_\\  \\   |  |      /  /_\\  \\     >   <     \\_    _/   ');
console.log('|  |__| |  /  _____  \\  |  `----./  _____  \\   /  .  \\      |  |     ');
console.log(' \\______| /__/     \\__\\ |_______/__/     \\__\\ /__/ \\__\\     |__|     ');
console.log('');

// Setup Express
const app = express();
const port = 3000;

// Setup middleware
app.use(morgan(`${chalk.bgMagenta.black.bold(':method') } :url | :status | :response-time ms`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Load routes
console.log(`${chalk.bgCyan.black.bold('INFO')} Loading routes.`);
const categoriesRoute = require('./routes/categories');
const channelsRoute = require('./routes/channels');
const usersRoute = require('./routes/users');
const ingestRoute = require('./routes/ingest');

app.use('/categories', categoriesRoute);
app.use('/channels', channelsRoute);
app.use('/users', usersRoute);
app.use('/ingest', ingestRoute);

// Run server
app.listen(port, '127.0.0.1', () => {
    console.log(`${chalk.bgGreen.black.bold('STATUS')} Galaxy is now listening on 127.0.0.1:${port}.`);
});