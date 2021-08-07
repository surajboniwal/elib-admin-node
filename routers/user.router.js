const router = require('express').Router()
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')
const jwtHelper = require('./../helpers/jwt.helper')

router.use(jwtHelper.verifyAccessToken)

router.get('/', userController.getAll)
router.get('/:id', userMiddleware.getUser, userController.get)
router.delete('/:id', userMiddleware.getUser, userController.delete)

module.exports = router