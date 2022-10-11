const User = require('../../models/User');
const bcryptjs = require ('bcryptjs');

const updateClient = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { email, password } = req.body;
        if (email === "" || email === undefined ) {
            const cryptPass = await bcryptjs.hash(password,8)
        const newUser = await User.findByIdAndUpdate(req.session.userId, { password: cryptPass });
        res.redirect('/cuenta');
        return
        }
        if (password === "" || password === undefined ) {
            const newUser = await User.findByIdAndUpdate(req.session.userId, { email });
            res.redirect('/cuenta');
            return
            }
    }
    next()
};
module.exports = {
    updateClient,
};