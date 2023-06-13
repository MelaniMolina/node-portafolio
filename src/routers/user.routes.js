//Invocamos la funcion routeer
const {Router} = require('express')
//Invoacar las funiones del controlador 
const { renderRegisterForm, registerNewUser, 
    renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
//Inicialzar ñla funcion en eel variable router
const router = Router()
//Definir las rutas
router.get('/user/register',renderRegisterForm)
router.post('/user/register',registerNewUser)
router.get('/user/login',renderLoginForm)
router.post('/user/login',loginUser)
router.post('/user/logout',logoutUser)

//Exportamos por default
module.exports =router