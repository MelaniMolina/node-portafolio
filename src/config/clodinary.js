//Requerimos la libreria 
const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    //Llamar a la variables del archivo 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});
//Exportacion por default del metodo uploadImage
module.exports.uploadImage = async(filePath) => {
     //Subir la imagen de la ruta (FILEPATH)en la carpeta portafolio 
     //Claudinary
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}
 //Exportacion por default del metodo deleteImage
module.exports.deleteImage = async (publicId)=>{
    //Elimina la imagen en base a la id
    return await cloudinary.uploader.destroy(publicId)
}