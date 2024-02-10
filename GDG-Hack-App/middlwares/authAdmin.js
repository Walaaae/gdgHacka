const { CustomError } = require('../errors/customError')
const {StatusCodes} = require('http-status-codes')
module.exports.checkAdmin = (req, res, next) => {
    if (!req.user || !req.user.admin) {
      throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
    }
    next();
  }; 