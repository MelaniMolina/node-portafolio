//Importacion del modelo 

const Portfolio = require('../models/Portfolio')
const fs = require('fs-extra')
const { uploadImage,deleteImage } = require('../config/clodinary')


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


//Capturar los datos del formulario para almacenar en la BDD
const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body   
    const newPortfolio = new Portfolio({title,category,description})
    newPortfolio.user = req.user._id
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }

    await fs.unlink(req.files.image.tempFilePath)
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
    //Verifica el id del portafolio sea el mismo
    const portfolio = await Portfolio.findById(req.params.id).lean()
    //Si es true continuar con la edicion y si es False envia la ruta del portafolio
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    //Validar de que venga una imagen en el portafolio 
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        //Eliminar la imagen en Cloudinary
        await deleteImage(portfolio.image.public_id)
        //Cargar la nueva imagen 
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        //Construir la data para actulizar en la BDD
        const data ={
            title:req.body.title || portfolio.name,//Se mantenga lo que esta en  los inputs
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
            
        }
        //Eliminar la imagen temporal 
        await fs.unlink(req.files.image.tempFilePath)
        //Actualizar en BDD findByIdAndUpdate
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}

const deletePortafolio = async(req,res)=>{
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
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