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
import { categories } from './routes/categories';
import { channels} from './routes/channels';
import { users } from './routes/users';
import { ingest } from './routes/ingest';

app.use('/categories', categories);
app.use('/channels', channels);
app.use('/users', users);
app.use('/ingest', ingest);

// Run server
app.listen(port, '127.0.0.1', () => {
    console.log(`${chalk.bgGreen.black.bold('STATUS')} Galaxy is now listening on 127.0.0.1:${port}.`);
});