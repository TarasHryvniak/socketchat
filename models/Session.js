const { model, Schema, Types } = require('mongoose');

const schema = new Schema({
    users:[{type: Types.ObjectId, ref:'User'}],
    messages:[{
        from:{type: Types.ObjectId, ref: 'User'},
        sendersName:{type: String},
        body:{type: String},
        readed:{type: Boolean}}]
})

module.exports = model('Session', schema)