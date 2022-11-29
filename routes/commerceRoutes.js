const CryptoJs = require('crypto-js')
const cartRender = require('../controllers/getControllers/cartRender');
const {
    deleteProductFromCart,
} = require('../controllers/getControllers/deleteProductFronUserCart');
const {
    createOrderMercadoPago,
} = require('../controllers/getControllers/mercadopagoPaymentController');
const {
    captureOrderPayPal,
    cancelOrderPayPal,
    createOrderPayPal,
} = require('../controllers/getControllers/paypalPaymentController');
const {
    addProductToCart,
} = require('../controllers/postControllers/addProductToCart');
const User = require('../models/User');
const Product = require('../models/Product');
const transporter = require('../helpers/transporter');
const Sale = require('../models/Sale');

const router = require('express').Router();
router.get('/', cartRender);
router.get('/captureOrderPayPal', captureOrderPayPal);
router.get('/cancelOrderPayPal', cancelOrderPayPal);
router.get('/createOrderPayPal', createOrderPayPal);
router.get('/successPayMercadopago', async (req, res, next) => {
    if (!req.session.loggedIn) {
        next();
        return;
    }
    const { status, payment_type, payment_id } = req.query;
    if (!status) {
        next();
        return;
    }
    if (status === 'approved') {
        User.findOne({ email: req.session.email })
            .populate('cart')
            .then(async (user) => {
                let text = `${user.username} gracias por tu compra en PayTooWin a continuación se encuentran tus productos comprados con su nombre de usuario y su contraseña.`;
                let counter = 1;
                let owner = {};
                const date = new Date()
                let sale = new Sale({
                    buyer: user._id,
                    sellers:[],
                    products:[],
                    userPercentage:0,
                    platformPercentaje:0,
                    total:0,
                    createdAt:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                })
                let decryptProductPassword,
                    bytes
                for (let i = 0; i < user.cart.length; i++) {
                    const product = user.cart[i];
                    await Product.findByIdAndUpdate(product.id, {
                        partialDelete: true,
                        sold:true,
                    });
                    owner = await User.findById(product.owner[0]);
                    owner.balance = owner.balance + (product.price * 75) / 100;
                    sale.sellers = [...sale.sellers,owner._id]
                    sale.products = [...sale.products,product._id]
                    sale.userPercentage += (product.price*75)/100
                    sale.platformPercentaje += (product.price*25)/100
                    sale.total+= product.price 
                    await owner.save();
                    bytes = CryptoJs.AES.decrypt(product.password,'secret key')
                    decryptProductPassword= bytes.toString(CryptoJs.enc.Utf8)
                    text += `\n\nCuenta numero ${counter}\nJuego${product.game}\nNombre de usuario: ${product.username}\nContraseña: ${decryptProductPassword}`;
                    counter++;
                }
                await sale.save();
                user.oldPurchases = [...user.oldPurchases, ...user.cart];
                user.cart = [];
                console.log(text);
                await user.save();
                await transporter.sendMail({
                    from: 'paytoowin-noreply@gmail.com',
                    to: `${user.email}`,
                    subject: 'Compra Exitosa',
                    text,
                });
                res.redirect(`/commerce/successPay?id=${saveSale.id}`);
            });
    }
});
router.get('/successPay',async(req,res)=>{
    const {id}= req.query
    const sale = await Sale.findById(id).populate('buyer products')
    res.status(200).render('./commerceViews/pagoexitoso',{login:{username:req.session.username,rol:req.session.rol},sale})
})
router.post('/addToCart', addProductToCart);
router.post('/deleteProductFromCart', deleteProductFromCart);
module.exports = router;
