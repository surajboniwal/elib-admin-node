const db = require('../helpers/db.helper')
const Admin = db.admin
const ApiError = require('./../errors/api.error')

exports.getProfile = (req, res, next) => {
    Admin.findOne({
        email: req.email
    }).exec((err, admin) => {
        if (err) {
            return next(err)
        }

        if (!admin) {
            return next(ApiError.badrequest())
        }

        delete req.email
        req.profile = admin
        next()
    })
}

exports.checkIfEmailExist = async (req, res, next) => {
    Admin.findOne({
        'email': req.body.email
    }).exec((err, admin) => {
        if (err) {
            return next(err)
        }

        if (admin) {
            return next(ApiError.conflict('Email already in use'))
        }

        next()
    })
}