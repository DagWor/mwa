const Book = require('../data/book.model')
const User = require('../data/user.model')

module.exports.addOneUser = (req, res) => {
    const newUser = {};
    newUser.name = req.body.name
    newUser.role = req.body.role

    User.create(newUser, (err, user) => {
        const response = {
            status: 201,
            message: user
        }
        if (err) {
            response.status = 500;
            response.message = err
        } 
        
        res.status(response.status).json(response.message)
    })
}

module.exports.getBookAuthor = (req, res) => {
    Book.findById(req.params.id).exec((err, book) => {
        const response = {
            status: 200,
            message: book
        }

        if (err) {
            response.status = 500
            response.message = 'Internal Server Error'
        }

        if (!book) response.message = 'Book not found'

        if (book.author) {
            User.findById(book.author.toString()).exec((err, user) => {

                if (err) {
                    response.status = 500
                    response.message = 'Internal Server Error'
                }

                if (!user) response.message = 'Author not found'
                else response.message = user

                res.status(response.status).json(response.message)
            })
        }
        else {
            response.message = 'Author not found'
            res.status(response.status).json(response.message)
        }

    });
}

module.exports.deleteOneAuthor = (req, res) => {
    const response = {
        status: 204,
        message: "Deleted author"
    }
    Book.findById(req.params.id).exec((err, book) => {
        if (err) {
            response.satus = 500
            response.message = 'Internal Server Error'
        } else if (!book.author) {
            response.status = 404
            response.message = 'Author not found'
        }

        else {
            User.findByIdAndDelete(book.author.toString()).exec((err, deletedUser) => {
                if (err) {
                    response.satus = 500
                    response.message = 'Internal Server Error'
                } else if (!deletedUser) {
                    response.status = 404
                    response.message = 'Author not found'
                } else {
                    book.author.remove()

                    book.save((err, book) => {
                        if (err) {
                            response.satus = 500
                            response.message = 'Internal Server Error'
                        } else if (!book) {
                            response.status = 404
                            response.message = 'Author not found'
                        }

                        res.status(response.status).json(response.message)
                    })
                }
            })
        }
    });
}

module.exports.patchOneAuthor = (req, res) => {
    Book.findById(req.params.id).exec((err, book) => {
        const response = {
            status: 201,
            message: book
        }

        if (err) {
            response.status = 500
            response.message = 'Internal Server Error'

        }
        else if (!book) {
            response.status = 404
            response.message = 'book not found'
        }
        if (response.status !== 201) res.status(response.status).json(response.message)

        else {
            if (book.author) {
                if (req.body.name) book.author.name = req.body.name
                if (req.body.rating) book.author.rating = req.body.rating
                book.save((err, updatedbook) => {
                    if (err) {
                        response.status = 500
                        response.message = err
                    } else {
                        response.message = updatedbook
                    }
                    res.status(response.status).json(response.message)
                })
            } else res.status(404).json({ 'message': 'publisher not found' })
        }
    });
}



module.exports.updateOneAuthor = (req, res) => {

    Book.findById(req.params.id).exec((err, book) => {
        const response = {
            status: 201,
            message: book
        }

        if (err) {
            response.status = 500
            response.message = 'Internal Server Error'

        }
        else if (!book) {
            response.status = 404
            response.message = 'book not found'
        }
        if (response.status !== 201) res.status(response.status).json(response.message)

        else {
            if (book.author) {
                if (req.body && req.body.name) {
                    User.findById(book.author.toString()).exec((err, user) => {
                        if (err) {
                            response.status = 500
                            response.message = 'Error finding author'
                        } else if (!user) {
                            response.status = 404
                            response.message = 'User not found'
                        }

                        if (response.status !== 201) res.status(response.status).json(response.message)
                        else {
                            user.name = req.body.name
                            user.save((err, updatedUser) => {
                                if (err) {
                                    response.status = 500
                                    response.message = 'Error finding author'
                                } else if (!updatedUser) {
                                    response.status = 404
                                    response.message = 'User not found'
                                }
                                res.status(response.status).json(response.message)

                            })
                        }
                    })
                }
            } else res.status(404).json({ 'message': 'publisher not found' })
        }
    });
}

module.exports.getAuthorBooks = (req, res) => {
    User.findById(req.params.id).exec((err, author) => {
        const response = {
            status: 200,
            message: author
        }
        if (err) {
            response.status = 500
            response.message = "Internal Server Error"
        } else if (!book) {
            response.status = 404
            response.message = "author not found in database"
        } else {
            Book.find({author: author._id}).exec((err, books) => {
                if (err) {
                    response.status = 500
                    response.message = "Internal Server Error"
                } else if (!books) {
                    response.status = 404
                    response.message = "books not found in database"
                } else response.message = books
                
                res.status(response.status).json(response.message)
            })
        }
    })
}