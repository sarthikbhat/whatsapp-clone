const User = require("../models/user");

const socketRoute = (socket) => {
  console.log("connected");
  socket.emit("greeting-from-server", {
    greeting: "Hello Client",
  });
  socket.on("greeting-from-client", function (message) {
    console.log(message);
  });


};

module.exports = socketRoute;
