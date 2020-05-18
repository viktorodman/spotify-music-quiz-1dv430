'use strict'


const authorize = (req, res, next) => {
    if (!req.session.user) {
      return next(res.status(403).json({
          status: '403',
          message: 'User not Authorized'
      }))
    }
    next()
}


module.exports = { authorize }