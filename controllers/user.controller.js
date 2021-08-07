const user = require('./../helpers/db.helper').user

exports.getAll = async (req, res, next) => {
    return res.json(await user.find())
}

exports.get = async (req, res, next) => {
    return res.json(req.user)
}

exports.delete = async (req, res, next) => {
    await req.user.remove()
    return res.sendStatus(204)
}