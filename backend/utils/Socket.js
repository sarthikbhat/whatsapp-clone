const User = require("../models/user");

const middleWare = async (socket, next) => {
    const userName = socket.handshake.auth.userName;
    const findUser = await User.findOne({
      userName,
    });
    console.log(!findUser);
    if (!findUser) {
      return next(new Error("User not registered !!"));
    }
    socket.userName = userName;
    next();
  };

  module.exports = middleWare;