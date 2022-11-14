const Product = require("../../models/Product");
const transporter = require('../../helpers/transporter');
const User = require("../../models/User");
const verifiedProduct = async(id)=>{
const product = await Product.findByIdAndUpdate(id, {verified:true}).populate('owner')
await transporter.sendMail({
    from: '"paytoowin" <paytoowin.noreply@gmail.com>"',
    to: `${product.owner[0].email}`,
    subject: 'Cuenta verificada',
    text: `Saludos ${product.owner[0].username} su cuenta ${product.username} fue verificada exitosamente `,
});

return product

}
module.exports = verifiedProduct