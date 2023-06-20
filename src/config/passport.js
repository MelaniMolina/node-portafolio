//Importacion del password
const passport = require('passport')
//Importamos el moddelo user
const User = require('../models/User')
//Definicion de la Estrategia

const LocalStrategy = require('passport-local').Strategy
//configuracion de la estrategia
passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
    //Traer el usuario en base al email 
    const userBDD = await User.findOne({email})
    //Validacion del usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //Validacion de las contraseñas
    const passwordUser = await userBDD.matchPassword(password)
    //Validacion del Password del formulario vs el de la BDD
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    //Retorna el usuario 
    return done(null,userBDD)
}))

//Serelializacion del usuario

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
//Deserializacion del usuario 
passport.deserializeUser(async (id, done) => {
    //Traer el usuario en la base al ID de la Session
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});