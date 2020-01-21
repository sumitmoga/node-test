const mongoose=require('mongoose');

const requestSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientId:{type:Number},
    requestId:{type:Number},
    hours:{type:Number}
});

module.exports= mongoose.model('Request', requestSchema);