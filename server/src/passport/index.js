const fs = require('fs');
const path = require('path');
const { User } = require('../db');
const JwtStrategy =  require('passport-jwt').Strategy;
const ExtractJwt =  require('passport-jwt').ExtractJwt;

const pathToKey = path.join(__dirname, '..','cryptography','id_rsa_pub.pem');
const PUB_KEY   = fs.readFileSync(pathToKey, 'utf8');


// Pasamos Public Key: para verificar identidad.
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

// Verify Callback
const strategy = new JwtStrategy(options, (payload, done)=>{

    User.findOne({ where: { ID: payload.sub } })
        .then((user)=>{
            user ? done(null, user) : done(null, false);
        })
        .catch( (err) => done(err, null) )

});

module.exports = (passport) => { 
    passport.use(strategy);
 };