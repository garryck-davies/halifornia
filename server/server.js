require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bcrypt = require('bcryptjs');
const controller = require('./controller');

//initialize express app
const app = express();

//destructure from .env
let { CONNECTION_PORT, CONNECTION_STRING, SECRET } = process.env;

//connect to DB
massive(CONNECTION_STRING).then(db => app.set('db', db));

//middleware
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

//endpoints
app.get('/api/products')
app.get('/api/user')
app.get('/api/logout')
app.post('/api/login', controller.login)
app.post('/api/register', controller.register)
app.post('/api/create_account')
app.post('/api/shopping_bag')
app.put('/api/quantity')
app.delete('/api/shooping_bag_delete')


//listen on port
app.listen(CONNECTION_PORT, () => {
    console.log(`Listening on port: ${CONNECTION_PORT}`)
})