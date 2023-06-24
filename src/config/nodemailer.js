//Importamos el modulo
const nodemailer = require("nodemailer");

//Configuraciones del servidor SMTP
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


//Definir la estructura del correo electronico
module.exports.sendMailToUser = async(userMaila,token)=>{
    console.log(token);
    //El cuerpo del email
    let info = await transporter.sendMail({
    //DE 
    from: 'admin@esfot.com',
    //PARA
    to: userMaila,
    //Asunto
    subject: "Verifica tu cuenta de correo electrónico",
    //Cuerpo del email
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    //Verifica en  consola
    console.log("Message sent: %s", info.messageId);
}