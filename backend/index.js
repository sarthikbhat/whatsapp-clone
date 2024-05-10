const express = require("express");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
require('dotenv').config()
const socketRoute = require('./routes/socket')
const socketMiddleWare =  require('./utils/Socket')

var dir = path.join(__dirname, "public");

// DB configuration
const db = require("./utils/db");

// Index Router File
const indexRouter = require("./routes/routes");

const PORT = process.env.PORT;

const app = express();

// Static files / images uploaded to server
app.use(express.static(dir));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/REST/", indexRouter);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//Socket 

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

// io.use(function(socket, next) {
//     socketMiddleWare(socket, next);
// })

io.on('connection', socketRoute);
