const axios = require('axios');
const User = require('../../models/User');
const Product = require('../../models/Product');
const transporter = require('../../helpers/transporter');
const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';
const createOrder = async (req, res, next) => {
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
                return_url: 'https://paytoowin.herokuapp.com/commerce/captureOrder',
                cancel_url: 'https://paytoowin.herokuapp.com/commerce/cancelOrder',
            },
        };
        const { data } = await axios.post(
            `${PAYPAL_API_URL}/v2/checkout/orders`,
            order,
            {
                auth: {
                    username:
                        'AXUbtsveRCDN2gqJt-yhBabZNknmsDAuzcwdSOmomPOvrMSK9Vo0NQYf9CGZHh0ygxghRWAAG8wcgFs3',
                    password:
                        'ENTgtGj36dghCJK58IWaNmoCM7QxoaiaIYNmTUQNj3eSf_nPa2Gl4-GGydZrO7vATIs2QZOM3zGUlz7k',
                },
            }
        );
        res.redirect(`${data.links[1].href}`);
        return;
    }
    next();
};
const cancelOrder = async (req, res) => {
    res.redirect('/commerce');
};
const captureOrder = async (req, res) => {
    const { token, PayerId } = req.query;
    const response = await axios.post(
        `${PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
        {},
        {
            auth: {
                username:
                    'AXUbtsveRCDN2gqJt-yhBabZNknmsDAuzcwdSOmomPOvrMSK9Vo0NQYf9CGZHh0ygxghRWAAG8wcgFs3',
                password:
                    'ENTgtGj36dghCJK58IWaNmoCM7QxoaiaIYNmTUQNj3eSf_nPa2Gl4-GGydZrO7vATIs2QZOM3zGUlz7k',
            },
        }
    );
    const user = await User.findOne({ email: req.session.email }).populate(
        'cart'
    );
    let text = `${user.username} gracias por tu compra en PayTooWin a continuación se encuentran tus productos comprados con su nombre de usuario y su contraseña.`
    let counter = 1
    user.cart.forEach(async (product) => {
        await Product.findByIdAndUpdate(product.id, {
            partialDelete: true,
        });
        text += `\nCuenta numero ${counter}\n Nombre de usuario: ${product.username}\n Contraseña: ${product.password}`
    });
    user.oldPurchases=[...user.oldPurchases,...user.cart]
    user.cart = [];
    await user.save();
    await transporter.sendMail({
        from:'paytoowin-noreply@gmail.com',
        to:`${user.email}`,
        subject:'Compra Exitosa',
        text
    })
    res.redirect('/commerce');
};
module.exports = {
    createOrder,
    cancelOrder,
    captureOrder,
};
