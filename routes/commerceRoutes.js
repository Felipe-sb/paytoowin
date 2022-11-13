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
const transporter = require('../helpers/transporter')

const router = require('express').Router();
router.get('/', cartRender);
router.get('/createOrderMercadoPago', createOrderMercadoPago);
router.get('/captureOrderPayPal', captureOrderPayPal);
router.get('/cancelOrderPayPal', cancelOrderPayPal);
router.get('/createOrderPayPal', createOrderPayPal);
router.get('/successPay', async (req, res, next) => {
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
        const user = await User.findOne({email:req.session.email}).populate('cart')
        let text = `${user.username} gracias por tu compra en PayTooWin a continuación se encuentran tus productos comprados con su nombre de usuario y su contraseña.`;
        let counter = 1;
        let owner = {};
        user.cart.forEach(async (product) => {
            console.log(product);
            await Product.findByIdAndUpdate(product.id, {
                partialDelete: true,
            });
            owner = await User.findById(product.owner[0]);
            owner.balance = owner.balance + (product.price * 75) / 100;
            await owner.save();
            text += `\n\nCuenta numero ${counter}\nJuego${product.game}\nNombre de usuario: ${product.username}\nContraseña: ${product.password}`;
            counter++;
        });
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
        res.render('./commerceViews/pagoexitoso',{
            login:{username:req.session.username}
        })
    }
});
router.post('/addToCart', addProductToCart);
router.post('/deleteProductFromCart', deleteProductFromCart);

module.exports = router;
