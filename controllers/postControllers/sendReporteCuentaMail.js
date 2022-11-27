const transporter = require("../../helpers/transporter")

const sendReporteCuentaMail = async(req,res) =>{
    const {email,subject,text} = req.body
    await transporter.sendMail({
        from:`"${email}" <paytoowin.noreply@gmail.com>`,
        to:"paytoowin.noreply@gmail.com",
        subject,
        text
    })
    res.render('./baseViews/reporteCuenta',{
        login:req.session.loggedIn,
        alertConfig:{
            alert:true,
            title:'Correo enviado con exito',
            text:'Nuestro equipo se contactara contigo a la brevedad',
            icon:'success',
            confirmButton:true,
            timer:false,
            route:'reporteCuenta'
        }
    });
}
module.exports = sendReporteCuentaMail