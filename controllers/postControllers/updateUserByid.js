const User = require('../../models/User');

const updateUserById = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { id, username, rol } = req.body;
        const newUser = await User.findByIdAndUpdate(id, { username, rol });
        res.redirect('/admin/users');
        return
    }
    next()
};
module.exports = {
    updateUserById,
};
