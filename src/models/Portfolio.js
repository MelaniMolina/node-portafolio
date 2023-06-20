const {Schema, model} = require('mongoose')

const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    },
    user:{
        type:String,
        required:true
},image:{
    public_id:String,
    secure_url:String
}
},{
    timestamps:true
})
//Creacion de la coleccion y tambien esta asociado a la crecacion

module.exports = model('portfolio',portfolioSchema)