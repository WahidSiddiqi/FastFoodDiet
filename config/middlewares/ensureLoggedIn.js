const checkUserLoggedInMiddleware = function (req, res, next) {
    // if a user is not logged in, redirect to login
    if (req.user === undefined) {
        res.redirect('/auth/google');
        return;
    }
    next();
};
module.exports = checkUserLoggedInMiddleware