const express = require('express')

const passport = require('passport');
const session = require('express-session');

//pueden acceder a los directorios

const fileUpload = require('express-fileupload')
const path = require('path');
require('./config/passport')

//Requerimos los Handlebars


const { engine }  = require('express-handlebars')
const methodOverride = require('method-override');



//Inicializaciones
const app = express()
//Configuraciones


app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname,'views'))

console.log(path.join(app.get('views'),'layouts'))

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));




// Variables globales
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})


// Middlewares 
app.set('view engine','.hbs')
//En donde se espefica con que vamos a trabajar Middleware
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))



app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())



//Rutas
app.use(require('./routers/portafolio.routes'))
//app.use(require('./routers/index.routes'))
app.use(require('./routers/user.routes'))

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')))
app.use(require('./routers/index.routes'))
module.exports=app
