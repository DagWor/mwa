module.exports.gameGetAll = (req, res) => {
    console.log("Games found");
    res.status(200).json({"games": "games"});
}