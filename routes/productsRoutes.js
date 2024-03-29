const addProductRender = require('../controllers/getControllers/addProductRender')
const addNewProduct = require('../controllers/postControllers/addNewProduct')
const getAllProducts = require('../controllers/getControllers/catalogRender')
const getProductById = require('../controllers/getControllers/getProductById')
const updateProductRender = require('../controllers/getControllers/updateProductRender')
const updateProduct = require('../controllers/postControllers/updateProduct')
const upload = require('../helpers/multer')
const validateAddProductForm = require('../middlewares/validateAddProductForm')
const deleteProduct = require('../controllers/postControllers/deleteProduct')
const listProducts = require('../controllers/getControllers/listProducts')
const { productFilter } = require('../controllers/postControllers/getProductsFilter')
const accountRender = require('../controllers/getControllers/accountRender')
const verifiedProduct = require('../controllers/postControllers/verifiedProduct')
const User = require('../models/User')
const validateUpdateProduct = require('../middlewares/validateUpdateProduct')
const Product = require('../models/Product')
const router = require('express').Router()
router.get('/',(req,res)=>{
    res.redirect('/products/catalog/1')
})
router.get('/catalog/:page',getAllProducts)
router.get('/product/:id',async(req,res,next)=>{
    const { id } = req.params;
    const product = await getProductById(id)
    console.log(product);
    if (!req.session.loggedIn) {
		res.render('./productsViews/product', { product, login: null });
		return;
	}
    const user = await  User.findOne({email:req.session.email}).populate('cart')
    let haveTheProductInCart = false
    user.cart.forEach(tmp=>{
        if (tmp.id === id) {
            haveTheProductInCart = true
        }
    })
	res.status(200).render('./productsViews/product', {
        haveTheProductInCart,
		product,
		login: { username: req.session.username, email: req.session.email, rol:req.session.rol},
	});
})
router.get('/filter/:page',async(req,res)=>{

    const {game,gameType,developer} = req.query;
    let query = {partialDelete:false, verified:true}
    if(game !== ''){
        query['game'] = game
    }
    if(gameType !== ''){
        query['gameType'] = gameType
    }
    if(developer !== ''){
        query['developer'] = developer
    }
    const page = req.params.page;
    if (Number(page)===NaN) {
        next();
        return
    }
    const products = await Product.paginate(query, {limit: 8, page});
    const pages = products.totalPages
    const current = page
    if (!req.session.loggedIn) {
       
    res.status(200).render('./productsViews/filter',{msg:null,products:products.docs,login:null, pages,current,game,gameType,developer})
        return
       }
    
       res.status(200).render('./productsViews/filter',{msg:null,products:products.docs,login:{username:req.session.username, rol:req.session.rol}, pages,current,game,gameType,developer})
        

})
router.get('/add-product',addProductRender)
router.get('/update-product/',listProducts)
router.get('/update-product/:id',updateProductRender)
router.post('/add-product',upload,validateAddProductForm,async(req,res)=>{
    if(!req.session.loggedIn){
        next()
        return
    }
    const { title, game, level, description, price,gameType,developer,username,password,email } = req.body;
    const owner = req.session.email
    const files = req.files
    addNewProduct(title, game, level, description, price,gameType,developer,username,password,email,owner,files)
        .then(async(product)=>{
            const user = await User.findOne({email:owner})
            user.products = [...user.products,product._id]
            await user.save()
            res.status(201).render('./productsViews/addProduct',{
                login:{username:req.session.username,rol:req.session.rol},
                product,
                alertConfig:{
                    alert:true,
                    title:'Producto agregado',
                    text:`Ahora tienes que esperar a que sea verificado por nuestro equipo`,
                    icon:'success',
                    confirmButton:true,
                    timer:false,
                    route:'products/catalog/1'
                }
            })
        })
})
router.post('/update-product',upload,validateUpdateProduct,async(req,res,next)=>{
    if(!req.session.loggedIn){
        next()
        return
    }
    const {id,title,game,level,description,price,username} = req.body
    const files = req.files
    const product = await updateProduct(id,title,game,level,description,price,username,files)
    res.status(202).render('./productsViews/updateProduct',{
        login:{
            username:req.session.username,
            email:req.session.email,rol:req.session.rol
        },
        rol:req.session.rol,
        product,
        alertConfig:{
            alert:true,
            title:'Producto actualizado con exito',
            text:'',
            icon:'success',
            confirmButton:true,
            timer:false,
            route:''
        }
    })
})
router.post('/delete',async(req,res,next)=>{
    if(!req.session.loggedIn){
        next();
        return;
    }
    const {id} = req.body;
    const product = await deleteProduct(id)
    res.status(202).render('./productsViews/addProduct',{
        login:{username:req.session.username,rol:req.session.rol},
        product:null,
        alertConfig:{
            alert:true,
            title:'Producto Eliminado',
            text:``,
            icon:'warning',
            confirmButton:true,
            timer:false,
            route:'products/catalog/1'
        }
    })
})

router.post('/verified',async(req,res,next)=>{
    if(!req.session.loggedIn){
        next();
        return;
    }
    const {id} = req.body;
    const product = await verifiedProduct(id)
    res.status(202).render('./productsViews/addProduct',{
        login:{username:req.session.username,rol:req.session.rol},
        product:null,
        alertConfig:{
            alert:true,
            title:'Producto Verificado',
            text:``,
            icon:'success',
            confirmButton:true,
            timer:false,
            route:'products/catalog/1'
        }
    })
})
module.exports =router