

const User = require('../users.js');


module.exports = (req, res, next) => {

  console.log('req.headers.authorization : ', req.headers.authorization);

  if (!req.headers.authorization) { next('invalid login'); }

  let token = req.headers.authorization.split(' ').pop();
  console.log('token ***** : ', token);
  console.log('k','k');
  User.verifyToken(token)
    .then(validUser => {
      console.log('validUser : ', validUser);
      req.user = validUser;
      next();
    }).catch(err => next(err));
};