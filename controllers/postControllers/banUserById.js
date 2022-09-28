const User = require('../../models/User');

const banUserById = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { id } = req.body;
        const newUser = await User.findByIdAndUpdate(id, { banned: true });
        res.redirect('/admin/users');
        return
    }
    next()
};
module.exports = {
    banUserById,
};
