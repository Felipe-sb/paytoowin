


const validateCheckbox = async (req,res,next) =>{
    
    const {accept} =  req.body 
    const booleanaccept = !!accept;
    console.log(booleanaccept)
    if (booleanaccept==false) {

        res.status(406).render('./authViews/register',{
            alertConfig:{
				alert:true,
				title:`Por favor acepte los terminos y condiciones`,
				text:``,
				icon:'warning',
				confirmButton:true,
				timer:false,
				route:'auth/register'
			}
            
        })
        
        return
    }else {
       
    next()
    }
}
module.exports=validateCheckbox