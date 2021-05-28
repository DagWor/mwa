const User = require('../data/user.model')

module.exports.registerUser = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }

    if(req.body && req.body.username && req.body.password){
        let newUser = {
            username: req.body.username,
            password: req.body.password
        }
        if(req.body.name) newUser.name = req.body.name

        User.create(newUser, (err, resp) => {
            if(err){
                response.status = 400
                response.message = "Username already taken"
            } 
            else response.message = resp;

            res.status(response.status).json(response.message)
        })
    } else {
        response.status = 400
        response.message = 'Username or password requied'
        res.status(response.status).json(response.message)
    }
}

module.exports.authenticateUser = (req, res) => {
    const response = {
        status: 200,
        message: ""
    }

    if(req.body && req.body.username && req.body.password){
        let authUser = {
            username: req.body.username,
            password: req.body.password
        }
        if(req.body.name) newUser.name = req.body.name

        User.findOne(authUser, (err, user) => {
            if(err){
                response.status = 500
                response.message = "Internal Server Error"
            } else if(!user) {
                response.status = 401
                response.message = 'User not found'
            }
            else response.message = user;

            res.status(response.status).json(response.message)
        })
    } else {
        response.status = 400
        response.message = 'Username or password requied'
        res.status(response.status).json(response.message)
    }
}