const Book = require('../data/book.model')

module.exports.getAllBooks = (req, res) => {
    const response = {
        status: 200,
        message: ''
    }
    let offset = 0
    let count = 5

    let maxCount = 10;

    if (req.query.offset) {
        try {
            offset = parseInt(req.query.offset)
        } catch (error) {
            response.status = 400
            response.message = 'Invalid input'
        }
    }

    if (req.query.count) {
        try {
            count = parseInt(req.query.count)
        } catch (error) {
            response.status = 400
            response.message = 'Invalid input'
        }
    }

    if (isNaN(offset) || isNaN(count)) {
        response.status = 400
        response.message = 'Query String offset and count should be numbers'
    }

    if (count > maxCount) {
        response.status = 400
        response.message = `Count can not be greater than ${maxCount}`
    }
    if (response.status !== 200) res.status(response.status).json(response.message);

    else {
        if (req.query.author && req.query.author !== "") {
            Book.find({ author: req.query.author }).exec((err, books) => {

                if (err) {
                    response.status = 500
                    response.message = 'Server Issues'
                }
                else if (!books) response.message = 'No books found'
                else response.message = books.slice(offset, count)

                res.status(response.status).json(response.message)
            })
        } else {
            Book.find().skip(offset).limit(count).exec((err, books) => {

                if (err) {
                    response.status = 500
                    response.message = 'Server Issues'
                }
                else if (!books) response.message = 'No books found'
                else response.message = books

                res.status(response.status).json(response.message)
            })
        }
    }
}

module.exports.getBookById = (req, res) => {
    const response = {
        status: 200,
        message: ""
    }

    Book.findById(req.params.id).exec((err, book) => {
        if (err) {
            response.status = 500
            response.message = 'Invalid ID provided'
        } else if (!book) {
            response.status = 404
            response.message = 'Book not found'
        } else if (book) response.message = book
        res.status(response.status).json(response.message)
    })
}

module.exports.addOneBook = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }
    console.log(req.body);
    if (req.body && req.body.title && req.body.year && req.body.edition && req.body.author && req.body.price && req.body.rating) {
        const newBook = {};
        newBook.title = req.body.title
        newBook.year = `${new Date(req.body.year).getFullYear()}`
        newBook.edition = parseInt(req.body.edition);
        newBook.author = req.body.author;
        newBook.price = parseFloat(req.body.price);
        newBook.rating = parseInt(req.body.rating)

        Book.create(newBook, (err, book) => {
            if (err) {
                response.status = 500;
                response.message = err
            } else response.message = book

            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = 'Insufficient information'

        res.status(response.status).json(response.message);
    }
}

module.exports.updateOneBook = (req, res) => {
    if (req.params.id) {
        Book.findOneAndReplace({_id: req.params.id}, req.body).exec((err, book) => {
            if (err) {
                response.status = 500
                response.message = 'Invalid ID provided'
            } else if (!book) {
                response.status = 404
                response.message = 'Book not found'
            } else if (book) response.message = book
            res.status(response.status).json(response.message)
        })
    }
}

module.exports.patchOneBook = (req, res) => {
    if (req.params.id) {
        Book.findByIdAndUpdate(req.params.id, req.body).exec((err, book) => {
            if (err) {
                response.status = 500
                response.message = 'Invalid ID provided'
            } else if (!book) {
                response.status = 404
                response.message = 'Book not found'
            } else if (book) response.message = book
            res.status(response.status).json(response.message)
        })
    }
}


module.exports.deleteOneBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, book) => {
        let response = {
            status: 204,
            message: ""
        }
        if (err) {
            response.status = 500
            response.message = "Internal Server Error"
        } else if (!book) {
            response.status = 404
            response.message = "book not found in database"
        } else {
            response.status = 204
            response.message = "book Deleted Successfully"
        }

        res.status(response.status).json({ 'message': response.message })
    })

}