import passport from 'passport'
import {
    usersManager
} from './dao/db/manager/usersManager.js';
import {
    Strategy as LocalStrategy
} from "passport-local";
import {
    Strategy as GithubStrategy
} from "passport-github2";
import {
    Strategy as GoogleStrategy
} from "passport-google-oauth20";
import {
    Strategy as JWTStrategy
} from "passport-jwt";
import { ExtractJwt } from 'passport-jwt';
import {
    hashData,
    compareData
} from './utils.js';

//local
//para recibir el req, se envia el objeto passReqToCallback en true
passport.use("signup", new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
}, async (req, email, password, done) => {
    const {
        first_name,
        last_name,
    } = req.body;

    if (!first_name, !last_name, !email, !password) {
        return done(null, false);
    }

    try {
        const hashPassword = await hashData(password);

        const createdUser = await usersManager.createOne({
            ...req.body,
            password: hashPassword
        });
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}));

passport.use("login", new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    if (!email || !password) {
        done(null, false)
    }
    try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
            done(null, false);
        }
        const isPasswordValid = await compareData(password, user.password)
        if (!isPasswordValid) {
            return done(null, false);
        }
        
        // const sessionInfo = email === "adminCoder@coder.com" ? {
        //     email,
        //     first_name: user.first_name,
        //     isAdmin: true
        // } : {
        //     email,
        //     first_name: user.first_name,
        //     isAdmin: false
        // };

        // req.session.user = sessionInfo;
        done(null, user)
    } catch (error) {
        done(error)
    }
}));

//gihub
passport.use("github", new GithubStrategy({
    clientID: "Iv1.7eb0cf2943478462",
    clientSecret: "306c6669a7d83c81fac0c97dd43f9a66ec7b35b1",
    callbackURL: "http://localhost:8080/api/session/callback",
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userDB = await usersManager.findByEmail(profile.emails[0].value);

        if (userDB) {
            if (userDB.isGithub) {
                // Usuario de GitHub ya registrado
                return done(null, userDB);
            } else {
                // Usuario encontrado pero no registrado como usuario de GitHub
                return done(null, false);
            }
        }

        // Usuario no encontrado, proceder con el registro
        const infoUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1],
            email: profile.emails[0].value,
            password:" ",
            isGithub: true,
        };

        const createdUser = await usersManager.createOne(infoUser);

        // Usuario registrado con éxito
        return done(null, createdUser);

    } catch (error) {
        // Manejar errores
        return done(error);
    }
}));

//GOOGLE
passport.use('google', new GoogleStrategy(
    {
        clientID: '722009616291-fli2451r1peqgs0q2qao9m6v5prqdmm4.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8080/api/session/auth/google/callback"
    }, async function(accessToken, refreshToken, profile, done){

        try {
            const userDB = await usersManager.findByEmail(profile._json.email);
            
            if (userDB) {
                if (userDB.isGoogle) {
                    // Usuario de GitHub ya registrado
                    return done(null, userDB);
                } else {
                    // Usuario encontrado pero no registrado como usuario de GitHub
                    return done(null, false);
                }
            }
    
            // Usuario no encontrado, proceder con el registro
            const infoUser = {
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                email: profile._json.email,
                password:" ",
                isGoogle: true,
            };
    
            const createdUser = await usersManager.createOne(infoUser);
            
            console.log(createdUser);
            // Usuario registrado con éxito
            return done(null, createdUser);
    
        } catch (error) {
            // Manejar errores
            return done(error);
        }
    }
))


const fromCookies = (req)=>{
    return req.cookies.token
}
//JWT
passport.use('jwt', new JWTStrategy({
    secretOrKey: "secretJWT",
    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
//    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
}, async function(jwt_payload, done) {
    done(null, jwt_payload);
}));

//current
//JWT
passport.use('current', new JWTStrategy({
    //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
    secretOrKey: "secretJWT"
}, async function(jwt_payload, done) {
    done(null, jwt_payload);
}));


//serialize y deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersManager.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }

})