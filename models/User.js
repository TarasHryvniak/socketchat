const { model, Schema, Types } = require("mongoose");


const schema = new Schema({
    userName:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sessions:[{
        users:[{type: Types.ObjectId}],
        lastMessage:{
            sendersName:{type: String},
            from:{type: Types.ObjectId, ref: 'User'},
            body:{type: String},
            readed:{type: Boolean},
            newMessageCount:{type: Number}}
    }]
})

module.exports = model('User', schema)