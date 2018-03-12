require('dotenv').config();
const express = require('express')
    , cors = require('cors')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , authController = require('./controller/auth_controller')
    , controller = require('./controller/controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    
        const db = app.get('db');
    
        let { user_id } = profile;
        console.log(profile)
    
        db.find_user([user_id]).then(users => {
            if (!users[0]) {
                db.create_auth([user_id]).then(user => {
                    db.insertID_users([user[0].userid]).then(userdata => {
                        return done(null, userdata[0])
                    })
                })
            }
            else {
                return done(null, users[0])
            }
        })
    }))




passport.serializeUser((profile, done) => {
    done(null, profile);
})
passport.deserializeUser((profile, done) => {
    done(null, profile);
})
//----------------------------//

//endpoint
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/home'
}))

// app.get('/api/friends/:userid', controller.getFriends)
// app.post(`/api/createFriend`, controller.createFriend)

app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);
app.get('/api/getUsers', authController.getUsers);
app.post('/api/addUser', authController.addUser);



// sim3: 83E
massive(process.env.CONNECTION).then(db=>{
    app.set('db', db);
    app.listen(process.env.SERVER_PORT, () => console.log(`Sup? It's me, port ${process.env.SERVER_PORT}`))
})
