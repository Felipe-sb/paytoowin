const axios = require('axios');
const User = require('../../models/User');
const Product = require('../../models/Product');
const transporter = require('../../helpers/transporter');
const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';
const createOrderPayPal = async (req, res, next) => {
    if (req.session.loggedIn) {
        const user = await User.findOne({ email: req.session.email }).populate(
            'cart'
        );
        const totalPrice = user.cart
            .map((product) => product.price)
            .reduce((before, now) => before + now);
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `${totalPrice}`,
                    },
                    description: 'accounts',
                },
            ],
            application_context: {
                brand_name: 'PayTooWin',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${process.env.HOST}/commerce/captureOrderPayPal`,
                cancel_url: `${process.env.HOST}/commerce/cancelOrderPayPal`,
            },
        };
        const { data } = await axios.post(
            `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
            order,
            {
                auth: {
                    username:process.env.PAYPAL_USERNAME,
                    password:process.env.PAYPAL_PASSWORD,
                },
            }
        );
        res.redirect(`${data.links[1].href}`);
        return;
    }
    next();
};
const cancelOrderPayPal = async (req, res) => {
    res.redirect('/commerce');
};
const captureOrderPayPal = async (req, res) => {
    const { token, PayerId } = req.query;
    const response = await axios.post(
        `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
        {},
        {
            auth: {
                username:process.env.PAYPAL_USERNAME,
                password:process.env.PAYPAL_PASSWORD,
            },
        }
    );
    User.findOne({ email: req.session.email })
            .populate('cart')
            .then(async (user) => {
                let text = `${user.username} gracias por tu compra en PayTooWin a continuación se encuentran tus productos comprados con su nombre de usuario y su contraseña.`;
                let counter = 1;
                let owner = {};
                for (let i = 0; i < user.cart.length; i++) {
                    const product = user.cart[i];
                    await Product.findByIdAndUpdate(product.id, {
                        partialDelete: true,
                        sold:true
                    });
                    owner = await User.findById(product.owner[0]);
                    owner.balance = owner.balance + (product.price * 75) / 100;
                    await owner.save();
                    text += `\n\nCuenta numero ${counter}\nJuego${product.game}\nNombre de usuario: ${product.username}\nContraseña: ${product.password}`;
                    counter++;
                }
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
            });
    res.redirect('/commerce');
};
module.exports = {
    createOrderPayPal,
    cancelOrderPayPal,
    captureOrderPayPal,
};
