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
            Book.find({ author: req.query.author })
                .then(books => {
                    if (book) res.status(200).json(book)
                    else res.status(404).json({ 'message': 'book not found' })
                })
                .catch(err => res.status(500).json({ message: err }))
        } else {
            Book.find().skip(offset).limit(count)
                .then(books => {
                    if (books) res.status(200).json(books)
                    else res.status(404).json({ 'message': 'books not found' })
                })
                .catch(err => res.status(500).json({ message: err }))
        }
    }
}

module.exports.getBookById = (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            if (book) res.status(200).json(book)
            else res.status(404).json({ 'message': 'book not found' })
        })
        .catch(err => res.status(500).json({ 'message': err }))
}

module.exports.addOneBook = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }
    if (req.body && req.body.title && req.body.year && req.body.edition && req.body.author && req.body.price && req.body.rating) {
        const newBook = new Book;
        newBook.title = req.body.title
        newBook.year = req.body.year
        newBook.edition = parseInt(req.body.edition);
        newBook.author = req.body.author;
        newBook.price = parseFloat(req.body.price);
        newBook.rating = parseInt(req.body.rating)

        newBook.save()
            .then(book => {
                res.status(201).json(book)
            })
            .catch(err => res.status(500).json({ 'message': err }))
    } else {
        response.status = 400;
        response.message = 'Insufficient information'

        res.status(response.status).json(response.message);
    }
}

module.exports.updateOneBook = (req, res) => {
    if (req.params.id) {
        Book.findOneAndReplace({ _id: req.params.id }, req.body)
            .then(book => {
                if (book) res.status(201).json(book)
                else res.status(404).json({ 'message': 'book not found' })
            })
            .catch(err => res.status(500).json({ 'message': err }))
    }
}

module.exports.patchOneBook = (req, res) => {
    if (req.params.id) {
        Book.findByIdAndUpdate(req.params.id, req.body)
            .then(book => {
                if (book) res.status(202).json(book)
                else res.status(404).json({ 'message': 'book not found' })
            })
            .catch(err => res.status(500).json({ 'message': err }))
    }
}


module.exports.deleteOneBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => {
            if (book) {
                res.status(204).json(book)
            } else res.status(400).json({ 'message': 'book not found' })
        })
        .catch(err => console.log(err))

}