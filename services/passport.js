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
            proxy: true, //setting the proxy true for the railway network is trustable
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleID: profile.id}) //Querying the data 

                if (existingUser) {
                return done(null , existingUser);
                } 

                //we dont have this user ID. Make a new record.
                const user = await new User({googleID: profile.id}).save();
                done(null, user)
        }
    )           
        
);