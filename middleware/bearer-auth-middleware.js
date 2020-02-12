

const User = require('../users.js');


module.exports = (req, res, next) => {

  console.log('req.headers.authorization : ', req.headers.authorization);
  console.log('req.token : ', req.token);
  if (!req.headers.authorization) { next('invalid login'); }
  let token;

// if user signin he will have a token in the request
  if(req.token){token = req.token;
  console.log('token exsist :')}

  // if the user enter the token in authorization
  else{
  token = req.headers.authorization.split(' ').pop();
  }
  console.log('token ***** : ', token);
  console.log('k','k');
  User.verifyToken(token)
    .then(validUser => {
      console.log('validUser : ', validUser);
      req.user = validUser;
      next();
    }).catch(err => next(err));
};
