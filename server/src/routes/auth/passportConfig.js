const { User } = require('../../db');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { validatePassword } = require('./passwordUtils')



const verifyCallback = async (username, password, done) => {
    User.findOne({ where: { username } })
        .then((user)=>{
            if (!user) return done(null, false);

            const isValid = validatePassword(password, user.hashed_password, user.salt);
            
            return isValid ? done(null, user) :  done(null, false);
        }).catch((err) => done(err));

};

const strategy = new LocalStrategy();

passport.use(new LocalStrategy)


