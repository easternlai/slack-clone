const WorkSpace = require('../models/WorkSpace');
const Channel = require('../models/Channel');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.createWorkSpace = async (req,res,next) => {

    const {name, image, endpoint } = req.body;

    try {
        const workSpace = new WorkSpace ({
            name, image, endpoint
        });

        await workSpace.save();

        res.send(workSpace)

    } catch (err) {
        next(err);
    }
}

module.exports.getWorkSpaces = async (req, res, next) => {
    const workSpaces = await WorkSpace.aggregate([{$match: { }}]);

    res.send(workSpaces);

}



module.exports.createChannel = async(req, res, next) => {
    const {name, privateRoom} = req.body;
    const { workSpaceId } = req.params;

    try {
        const channel = new Channel({
            name, privateRoom, workSpace: workSpaceId
        });
        channel.save();

        res.send({channel})

    } catch (err) {
        next(err)
    }
}

module.exports.getChannels = async(req, res, next) => {
    const { workSpaceId } = req.params;
    
    const channels = await Channel.aggregate([
        {
            $match: {}
        }
    ])

    res.send(channels);
}