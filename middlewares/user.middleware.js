const user = require('../helpers/db.helper').user
const ApiError = require('../errors/api.error')
const ObjectId = require('mongoose').Types.ObjectId

exports.getUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return next(ApiError.badrequest("Invalid ID"))
    }
    user.findById(req.params.id).exec((err, user) => {
        if (err) {
            return next(ApiError.badrequest())
        }

        if (!user) {
            return next(ApiError.badrequest("No user found"))
        }

        delete req.email
        req.user = user
        next()
    })
}