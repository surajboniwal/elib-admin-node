const jwt = require('jsonwebtoken')
const ApiError = require('./../errors/api.error')
const admin = require('./db.helper').admin

exports.buildAccessToken = (email) => jwt.sign({ email: email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })

exports.buildRefreshToken = (email) => jwt.sign({ email: email }, process.env.JWT_REFRESH_SECRET)


exports.verifyAccessToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return next(ApiError.unauthorized())
    }

    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, data) => {
        if (err) {
            return next(ApiError.unauthorized())
        }

        req.email = data.email
        next()
    })
}

exports.verifyRefreshToken = async (req, res, next) => {

    if (!req.headers.authorization) {
        return next(ApiError.unauthorized())
    }

    let token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, data) => {
        if (err) {
            return next(ApiError.unauthorized())
        }

        const adminData = await admin.findOne({ refreshToken: token })

        if (!adminData) {
            return next(ApiError.unauthorized())
        }

        req.admin = adminData
        next()
    })

}