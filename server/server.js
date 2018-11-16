require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');


//initialize express app
const app = express();

//destructure from .env
let { CONNECTION_PORT } = process.env;

//connect to DB
massive()