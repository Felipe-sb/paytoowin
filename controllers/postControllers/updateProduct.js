const Product = require("../../models/Product")

const updateProduct = ( req, res)=>{
    const {id,title,game,level,description,price} = req.body
    console.log({id,title,game,level,description,price})
    Product.findByIdAndUpdate(id,{title,game,level,description,price},{new:true})
        .then((product) =>{
            console.log(product)
            if(!req.session.loggedIn){
                res.render('./productsViews/updateProduct',{
                    login:null,
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
                return
            }
            res.render('./productsViews/updateProduct',{
                login:{
                    username:req.session.username,
                    email:req.session.email
                },
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
}
module.exports=updateProduct