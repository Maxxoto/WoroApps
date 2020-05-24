const passport = require('passport')
const oauth = require('passport-google-oauth20')
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.use(
    new oauth(
        {
            clientID : keys.googleClientID,
            clientSecret : keys.googleClientSecret,
            callbackURL : '/auth/google/callback',
            // passReqToCallback : true
        },
        (accessToken,refreshToken,profile,done) => {
            // console.log("Profile : ",profile)
            User.findOne({ googleID : profile.id})
                .then( (existingUser) => {
                    if (existingUser){
                    //    Already have users in the database
                        done(null,existingUser)
                    } else {
                        new User ({
                            googleID : profile.id ,
                            name : profile.displayName ,
                            email : profile.emails[0].value ,
                        }).save()
                            .then(user => done(null,user))
                    }
                })

        }
    ))