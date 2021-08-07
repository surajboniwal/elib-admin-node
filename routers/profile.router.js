const router = require('express').Router()
const profileController = require('../controllers/profile.controller')
const profileMiddleware = require('./../middlewares/profile.middleware')
const jwtHelper = require('./../helpers/jwt.helper')

router.use(jwtHelper.verifyAccessToken)
router.use(profileMiddleware.getProfile)

router.get('/', profileController.getDetails)
router.get('/logout', profileController.logout)

module.exports = router