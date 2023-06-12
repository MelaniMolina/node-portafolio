//Importacion del modelo 

const Portfolio = require('../models/Portfolio')



const renderAllPortafolios = async(req,res)=>{
    //Apartir el modelo utilizar el metodo find y luego encontrar el metodo lean
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
}


const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}


const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    await newPortfolio.save()
    res.redirect('/portafolios')
}

//Dos Metodos para Actualizar en la base datos

const renderEditPortafolioForm =async(req,res)=>{
    //Apartir del metodo llamar al metodo findById
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Con la variable portafolio pintar en la vista del formulario
    res.render('portafolio/editPortfolio',{portfolio})
}



const updatePortafolio = async(req,res)=>{
    //Primero capturamos los datos del formulario 
    const {title,category,description}= req.body
    //Apartir del modelo llamar al metodo findByAndUpdate
    //Pasamos a la funcion el id del portafolio y los datos  a modificar
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    //Redirrecione a la vista
    res.redirect('/portafolios')
}

const deletePortafolio = async(req,res)=>{
    //Apartir del modelo 
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}




module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}