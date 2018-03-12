require('dotenv').config();
const express = require('express')
, cors = require('cors')
, session = require('express-session')
, bodyParser = require('body-parser')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0');

const app = express();
app.use(cors());
app.use(bodyParser.json());
//put this session stuff in this order
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
//this needs to be below session
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    done(null, profile);
}))

passport.serializeUser((profile, done)=>{
    done(null, profile);
})
passport.deserializeUser((profile, done)=>{
    done(null, profile);
})
//----------------------------//

//endpoint
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/'
}))

app.listen(process.env.SERVER_PORT, ()=> {
    console.log(`Sup? It's me, port ${process.env.SERVER_PORT}`)
})