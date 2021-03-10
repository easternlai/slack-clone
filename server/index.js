//Define modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const path = require('path');
const socketio = require('socket.io');
const jwt = require('jwt-simple');
const apiRouter = require('./routes');
const WorkSpace = require('./models/WorkSpace');

const app = express();
const PORT = process.env.PORT || 9000;

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use('/api', apiRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(compression());
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res){
        res.sendFiled(path.join(__dirname, 'client', 'index.html'));
    });
}
//Connect to Mongo
(async function() {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Connected to database")
    } catch (err) {
        console.log(process.env.MONGO_URI)
    }
})();



const expressServer = app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});


let workspaces = [];

(async function(){
    try {
        workspaces = await WorkSpace.aggregate([{$match: { }}]);
        console.log(workspaces);
    } catch (err) {
        console.log('Error')
    }
})();

const io = socketio(expressServer, {origins: ':'});
console.log('Socket.io listening for connections');

io.on('connection', (socket)=>{
    let wsData = workspaces.map((workspace)=> {
        return {
            ...workspace
        }
    });
    socket.emit('wsData', wsData);
    
    workspaces.forEach((workspace)=>{
    
        io.of(workspaces.endpoint).on('connection',(wsSocket)=>{
            console.log(wsSocketSocket.handshake);
        });
    });
});

module.exports = {io};