exports.getDetails = (req, res, next) => {
    return res.json(req.profile)
}

exports.logout = (req, res, next) => {
    req.profile.refreshToken = null
    req.profile.save()
    return res.sendStatus(200)
}