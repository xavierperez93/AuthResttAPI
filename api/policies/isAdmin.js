//this policy check whenever the logged user is an Admin or Etc..

module.exports = function isLoggedOut(req, res, next) {
    if (!req.session.userId) {
        if(req.session.right==='Admin'){
            return next();
        }
        return res.forbidden('You are not allowed to perform this action.');
    }
    if (req.wantsJSON) {
        return res.forbidden('You are not permitted to perform this action.');
    }
        return res.redirect('/');
    };