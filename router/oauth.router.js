const express = require('express')
const passport = require('passport')
const { ensureAuth, ensureGuest } = require('../controller/oath.controller')
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile')
    }
)

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        res.redirect('/')        
    })
})

router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})

router.get("/profile", ensureAuth, async (req, res) => {
    res.render('index', { userinfo: req.user })
})
module.exports = router