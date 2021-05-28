const User = require('../data/user.model')
const bcrypt = require('bcrypt-nodejs')

module.exports.registerUser = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }

    if(req.body && req.body.username && req.body.password){
        let newUser = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
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
        response.message = {'message': 'Username or password requied'}
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
            username: req.body.username
        }
        if(req.body.name) newUser.name = req.body.name

        User.findOne(authUser, (err, user) => {
            if(err){
                response.status = 500
                response.message = {'message': "Internal Server Error"}
            } else if(!user) {
                response.status = 401
                response.message = {'message': 'user not found'}
            }
            else {
                if(bcrypt.compareSync(req.body.password, user.password)) response.message = user;
                else {
                    response.status = 401
                    response.message = {"message" : 'uauthorized'}
                }
            }

            res.status(response.status).json(response.message)
        })
    } else {
        response.status = 400
        response.message = {'message': 'Username or password requied'}
        res.status(response.status).json(response.message)
    }
}