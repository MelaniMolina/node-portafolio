//Importar Password
const passport = require("passport")

//Importamos el modelo
const User = require('../models/User')

const { sendMailToUser } = require("../config/nodemailer")




//Presenta el formulario para el registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

const registerNewUser = async(req,res)=>{
    
    const{name,email,password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    const newUser = await new User({name,email,password,confirmpassword})
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    sendMailToUser(email,token)
    newUser.save()
    res.redirect('/user/login')
}
//Confirmar Token
const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    //Cargar el usuario en bas al token recptado
    const userBDD = await User.findOne({token:req.params.token})
    
     // Verificar si el usuario existe
  if (!userBDD) {
    return res.send("Lo sentimos, el token no es válido");
  }
    
    //Setear el token a null
    userBDD.token = null
    //Cambiar el email a true
    userBDD.confirmEmail=true
    //Guardar en BDD
    await userBDD.save()
    //Mensaje de Respuesta
    res.send('Token confirmado, ya puedes iniciar sesión');
}




// //Capturar loa datos del formulario y guardar BDD
// const registerNewUser = async(req,res)=>{
//     //Desetructurar los datos del formulario
//     const{name,email,password,confirmpassword} = req.body
//     //Validar si todos los campos estan llenos
//     if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
//     //Validacion de las contraseñas 
//     if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
//     //Traer el usuario en base al email
//     const userBDD = await User.findOne({email})
//     //Verificar si existe el usuario
//     if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
//     //Guardar el registro en la BDD
//     const newUser = await new User({name,email,password,confirmpassword})
//     //Encriptar el password
//     newUser.password = await newUser.encrypPassword(password)
//     newUser.save()
//     res.redirect('/user/login')
// }
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
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}