module.exports.addition = (req, res) => {
    let number1 = parseInt(req.query.number);
    let number2 = parseInt(req.params.number);

    let result = number1 + number2;
    res.status(200).send(result.toString());
}