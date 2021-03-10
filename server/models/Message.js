const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: 'string',
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    channel: {
        type: Schema.ObjectId,
        ref: 'Channel'
    }
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;