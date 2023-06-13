//Importar Password
const passport = require("passport")

//Importamos el modelo
const User = require('../models/User')

//Presenta el formulario para el registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}



//Capturar loa datos del formulario y guardar BDD
const registerNewUser = async(req,res)=>{
    //Desetructurar los datos del formulario
    const{name,email,password,confirmpassword} = req.body
    //Validar si todos los campos estan llenos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //Validacion de las contraseñas 
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //Traer el usuario en base al email
    const userBDD = await User.findOne({email})
    //Verificar si existe el usuario
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //Guardar el registro en la BDD
    const newUser = await new User({name,email,password,confirmpassword})
    //Encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    newUser.save()
    res.redirect('/user/login')
}

//Presenta el formulario para el login 
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
//Capturar loa datos del formulario y hacer el login

const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

const logoutUser =(req,res)=>{
    res.send('logout user')
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}