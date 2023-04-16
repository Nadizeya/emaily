const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleID: profile.id})
                .then((existingUser) => {
                    if (existingUser){
                        //we aldy have the record with the given ID.
                        done(null , existingUser);
                    }else{
                        //we dont have this user ID. Make a new record.
                        new User({googleID: profile.id})
                        .save()
                        .then(user => done(null, user));
                    }
                })           
        }
    )
);