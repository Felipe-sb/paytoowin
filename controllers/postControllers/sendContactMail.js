const transporter = require("../../helpers/transporter")

const sendContactMail = async(req,res) =>{
    const {email,subject,text} = req.body
    await transporter.sendMail({
        from:`"${email}" <paytoowin.noreply@gmail.com>`,
        to:"paytoowin.noreply@gmail.com",
        subject,
        text
    })
    res.render('./baseViews/contact',{
        alertConfig:{
            alert:true,
            title:'Correo enviado con exito',
            text:'Nuestro equipo se contactara contigo a la brevedad',
            icon:'success',
            confirmButton:true,
            timer:false,
            route:'contact'
        }
    });
}
module.exports = sendContactMail