const express = require('express');
const spaceRouter = express.Router();

const { getWorkSpaces, createWorkSpace, createChannel, getChannels} = require('../controllers/spaceController');

spaceRouter.post('/', createWorkSpace);
spaceRouter.post('/:workSpaceId', createChannel);
spaceRouter.get('/', getWorkSpaces);

spaceRouter.get('/:workSpaceId', getChannels);

module.exports = spaceRouter;