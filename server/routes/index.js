const express = require('express');
const authRouter = require('./auth');
const spaceRouter = require('./space');
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/space', spaceRouter);

module.exports = apiRouter;