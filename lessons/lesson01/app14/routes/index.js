const express = require('express')
const router = express.Router();

router.route('/json')
.get((req, res) => {
    console.log("GET");
    res.status(200).json({'name': 'get'});
})
.post((req, res) => {
    console.log("POST");
    res.status(200).json({'name': 'post'});
})

module.exports = router;