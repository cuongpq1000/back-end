
const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/')
    }
}
const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/profile');
    }
}

module.exports = {
    ensureAuth,
    ensureGuest
}