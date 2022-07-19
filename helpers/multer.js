const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    },
    destination: path.join(__dirname,'../public/img/accounts'),
})
const upload = multer({
    storage,
    dest:path.join(__dirname,'/public/img/accounts')
}).array('images')
module.exports = upload