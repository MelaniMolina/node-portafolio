const express = require('express')

//pueden acceder a los directorios
const path = require('path');

//Requerimos los Handlebars


const { engine }  = require('express-handlebars')
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

app.set('view engine','.hbs')
//En donde se espefica con que vamos a trabajar Middleware
app.use(express.urlencoded({extended:false}))


//Varibales locales

//Rutas


app.get('/',(req,res)=>{
    res.render('index')
})

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')))
app.use(require('./routers/index.routes'))
module.exports=app