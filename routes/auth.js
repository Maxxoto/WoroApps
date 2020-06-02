const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google',passport.authenticate(
        'google',
        {
            scope : ['profile','email']
        }
    ))


    app.get('/auth/google/callback', passport.authenticate(
        'google'
    ))

    // Get my profile
    app.get('/api/users/me', (req , res) => {
        res.send(req.user)
    })

    // Logout
    app.get('/api/logout',(req, res) => {
        req.logout()
        res.send(req.user)
    })

}
