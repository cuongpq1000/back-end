const express = require('express')
const passport = require('passport')
const { ensureAuth, ensureGuest } = require('../middleware/oauth')
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173/')
    }
)

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('http://localhost:5173/')
    })
})

router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})

router.get("/profile", ensureAuth, async (req, res) => {
    res.render('index', { userinfo: req.user })
})

router.get('/get-user', ensureAuth, async(req, res) => {
  res.send(req.user)
})
module.exports = router
