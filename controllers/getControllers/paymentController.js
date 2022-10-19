const axios = require('axios');
const User = require('../../models/User');
const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';
const createOrder = async (req, res,next) => {
    if (req.session.loggedIn) {
        const user = await User.findOne({email:req.session.email}).populate('cart')
        const totalPrice = user.cart.map(product => product.price).reduce((before,now)=>before + now)
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `12.00`,
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
                        'AWCeTsS3yNzM5coeA0zkxBSg_Y6L_VNJASYqZqbH9y8fNSJmrvAbLUW9VbK83cnMj1_ToZBBjErBWlQ3',
                    password:
                        'EACs7Nu33blg_OBgLJevnA7SBo5dcfKNKI7jfCYlPDAGrbk20ut5FlkLoRBZsEucl0PqICpxHaM0iXJh',
                },
            }
        );
        res.redirect(`${data.links[1].href}`);
        return
    }
    next()
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
                    'AWCeTsS3yNzM5coeA0zkxBSg_Y6L_VNJASYqZqbH9y8fNSJmrvAbLUW9VbK83cnMj1_ToZBBjErBWlQ3',
                password:
                    'EACs7Nu33blg_OBgLJevnA7SBo5dcfKNKI7jfCYlPDAGrbk20ut5FlkLoRBZsEucl0PqICpxHaM0iXJh',
            },
        }
    );
    console.log(response);
    res.send('Orden capturada');
};
module.exports = {
    createOrder,
    cancelOrder,
    captureOrder,
};
