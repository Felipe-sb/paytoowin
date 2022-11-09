const mongoose = require('mongoose');
const getProductById = require('../controllers/getControllers/getProductById')
const Product = require('../models/Product')   
beforeEach(async() => {
    await mongoose.connect('mongodb+srv://felipe_soublette:Felipe.2020@cluster0.bos6s.mongodb.net/paytoowin?retryWrites=true')
});
describe('There are all test of product controllers', () => {
    it('the two products should be equal', async() => {
        const id = '6367ccf96b9faf01597cbc24'
        const product = await getProductById(id)
        const expected = await Product.findById(id)
        expect(expected).toBe(product)
    });
    it('the expected and to be product wont be equal (this test have to fail)', async() => {
        const id = '6367ccf96b9faf01597cbc24'
        const product = await getProductById(id)
        const expected = await Product.findById(id)
        expect(expected).toBe(product)
    });
});
    