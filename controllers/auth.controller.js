const db = require('../helpers/db.helper')
const bcrypt = require('bcryptjs')
const ApiError = require('./../errors/api.error')
const jwtHelper = require('./../helpers/jwt.helper')

exports.registration = async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    const admin = db.admin(req.body)
    await admin.save()
    res.sendStatus(201)
}

exports.login = (req, res, next) => {

    db.admin.findOne({
        'email': req.body.email
    }).select('+password +refreshToken').exec((err, admin) => {
        if (err) {
            return next(err)
        }
        if (admin) {
            if (bcrypt.compareSync(req.body.password, admin.password)) {

                if (admin.refreshToken == null) {
                    admin.refreshToken = jwtHelper.buildRefreshToken(admin.email)
                    admin.save()
                }

                return res.status(200).json({ accessToken: jwtHelper.buildAccessToken(admin.email), refreshToken: admin.refreshToken })
            }
            return next(ApiError.unauthorized('Invalid credentials'))
        }

        return next(ApiError.forbidden('Invalid credentials'))
    })
}

exports.token = (req, res, next) => {
    res.status(200).json({ accessToken: jwtHelper.buildAccessToken(req.admin.email) })
}