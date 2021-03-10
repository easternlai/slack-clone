const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkSpaceSchema = new Schema({
    image: String,
    name: String,
    endpoint: String
});

const SpaceModel = mongoose.model('Space', WorkSpaceSchema);

module.exports = SpaceModel;