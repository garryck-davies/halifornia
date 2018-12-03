const bcrypt = require('bcryptjs');


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

    getAllMensProducts(req, res) {
        let db = req.app.get('db');
        console.log('it works')
        db.find_mens().then(products => {
            res.status(200).send(products)
            console.log('this works 2')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    getAllWomensProducts(req, res) {
        let db = req.app.get('db');
        console.log('it works')
        db.find_womens().then(products => {
            res.status(200).send(products)
            console.log('this works as well')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    shopping_bag(req, res) {
        let db = req.app.get('db');
        console.log('bag retrieved')
        db.get_bag([req.session.user.user_id]).then(products => {
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
        db.add_to_bag([req.body.product_id, req.session.user.user_id, req.body.quantity]).then(products => {
            res.status(200).send(products)
            console.log('added it')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    },

    shopping_bag_delete(req, res) {
        let db = req.app.get('db');
        console.log(req.params)
        db.delete_item([req.params.product_id, req.session.user.user_id]).then(products => {
            console.log('products')
            console.log(products)
            res.status(200).send(products)
            console.log('deleted')
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }
}