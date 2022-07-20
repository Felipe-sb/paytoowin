const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'mycloudsb', 
    api_key: '664152299234654', 
    api_secret: '4J55bcmY_viuzJLEOuoG4KadSJI' 
});
module.exports = cloudinary;