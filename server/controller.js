const bcrypt = require('bcryptjs');


module.exports = {

    async register(req, res) {

        let { username, password } = req.body;
        let db = req.app.get('db');
        let foundUser = await db.find_users([username]);
        if (foundUser[0]) return res.status(200).send('Username already in use.')
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let [createdUser] = await db.create_users([username, hash]);
        req.session.user = {username: createdUser.user_name};
        res.status(200).send({status: 'logged in'});
    },

    async login(req, res) {

        let {username, password} = req.body;
        let db = req.app.get('db');
        let [foundUser] = await db.find_users([username]);
            if (foundUser) {
                let result = bcrypt.compareSync(password, foundUser.user_hash)
                if (result) {
                    req.session.user = { username: foundUser.user_name };
                    res.status(200).send({message: 'logged in'})
                } else {
                    res.status(401).send({message: 'Incorrect password.'});
                }
            } else {
                res.status(401).send({message: 'Email not found.'})
            }
    }
}