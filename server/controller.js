require('dotenv').config();
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET)


module.exports = {

    async register(req, res) {

        let { username, password } = req.body;
        let db = req.app.get('db');
        console.log('before body')
        console.log(req.body)
        let foundUser = await db.find_users(
            [username]
        ) 
        if (foundUser[0]) return res.status(200).send('Username already in use.')
        console.log('made it 2')
        
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let [newUser] = await db.create_users([username, hash]);
        console.log('it survived the first test')
        req.session.user = newUser;
        res.status(200).send({status: 'logged in'});
    },

    async login(req, res) {

        let {username, password} = req.body;
        let db = req.app.get('db');
        let [foundUser] = await db.find_users([username]);
        console.log('made it this far')
        console.log(foundUser.user_hash)
            if (foundUser) {
                console.log(foundUser.user_hash)
                let result = bcrypt.compareSync(password, foundUser.user_hash)
                console.log('result: ', result)
                if (result) {
                    req.session.user = foundUser;
                    console.log('user: ', req.session.user)
                    res.status(200).send({message: 'logged in'})
                } else {
                    console.log('login failed')
                    res.status(401).send({message: 'Incorrect password.'});
                }
            } else {
                res.status(401).send({message: 'Username not found.'})
            }
    },

    mensProducts(req, res) {
        let db = req.app.get('db');
        console.log('it works')
        db.select_mens().then(products => {
            res.status(200).send(products)
            console.log('this works 2')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    womensProducts(req, res) {
        let db = req.app.get('db');
        console.log('it works')
        db.select_womens().then(products => {
            res.status(200).send(products)
            console.log('this works as well')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    bag(req, res) {
        let db = req.app.get('db');
        console.log('bag retrieved')
        db.select_bag([req.session.user.user_id]).then(products => {
            console.log(products)
            res.status(200).send(products)
            console.log('got the bag')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    addToBag(req, res) {
        let db = req.app.get('db');
        console.log('its working so far')
        console.log(req.session.user)
        db.insert_bag([req.body.product_id, req.session.user.user_id]).then(products => {
            res.status(200).send(products)
            console.log('added it')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    removeProduct(req, res) {
        let db = req.app.get('db');
        console.log(req.params)
        db.delete_product([req.params.product_id, req.session.user.user_id]).then(products => {
            console.log('products')
            console.log(products)
            res.status(200).send(products)
            console.log('deleted')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    editQuantity(req, res) {
        let db = req.app.get('db');
        console.log(req.body.quantity)
        db.edit_quantity([req.params.quantity, req.body.product_id, req.session.user.user_id]).then(quantity => {
            res.status(200).send(quantity)
        }).catch(err => {
            res.status(500).send(err)
        })
    },
    
    handlePayment: (req, res) => {
        const {amount, token:{id}} = req.body
        stripe.charges.create(
            {
                amount: amount,
                currency: "usd",
                source: id,
                description: "Test charge from me"
            },
            (err, charge) => {
                if(err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log(charge)
                    return res.status(200).send(charge)
                }
            }
        )
    }
}