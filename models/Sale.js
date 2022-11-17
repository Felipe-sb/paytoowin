const {Schema,model} = require('mongoose')
const saleSchema = new Schema({
    buyer:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    sellers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    products:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],
    userPercentage:Number,
    platformPercentaje:Number,
    total:Number,
    createdAt:Date
})
const Sale = model('sale',saleSchema)
module.exports = Sale