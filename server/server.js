require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bcrypt = require('bcryptjs');
const ctrl = require('./controller');
const stripe = require('stripe');


//initialize express app
const app = express();

//destructure from .env
let { CONNECTION_PORT, CONNECTION_STRING, SECRET, STRIPE_KEY } = process.env;

//connect to DB
massive(CONNECTION_STRING).then(db => {
    console.log('DB CONNECTED')
    app.set('db', db)});

//middleware
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(`${__dirname}/../build`));

//endpoints
app.get('/api/mens', ctrl.mensProducts)
app.get('/api/womens', ctrl.womensProducts)
app.post('/api/login', ctrl.login)
app.post('/api/register', ctrl.register)
app.post('/api/bag', ctrl.bag)
app.post('/api/addToBag', ctrl.addToBag)
app.post('/api/checkout',  ctrl.handlePayment)
app.put('/api/editQuantity/:quantity', ctrl.editQuantity)
app.delete('/api/removeProduct/:product_id', ctrl.removeProduct)





//listen on port
app.listen(CONNECTION_PORT, () => {
    console.log(`Listening on port: ${CONNECTION_PORT}`)
})

