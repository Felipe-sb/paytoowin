const transporter = require("../../helpers/transporter")

const sendContactMail = async(req,res) =>{
    const {email,subject,text} = req.body
    await transporter.sendMail({
        from:`"${email}" <paytoowin.noreply@gmail.com>`,
        to:"paytoowin.noreply@gmail.com",
        subject,
        text
    })
    res.redirect('/auth/login');
}
module.exports = sendContactMail