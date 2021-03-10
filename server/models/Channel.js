const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    name: String,
    workSpace: {
        type: Schema.ObjectId,
        ref: 'WorkSpace'
    },
    privateRoom:{
        type: Boolean,
        default: false
    },
    history: [
        {
            message: {
                type: Schema.ObjectId,
                ref: 'Message'
            }
        }
    ]

});

const ChannelModel = mongoose.model('Channel', ChannelSchema);
module.exports = ChannelModel;