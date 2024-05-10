const User = require("../models/user");
const { createToken } = require("../utils/AuthUtil");
const handleError = require("../utils/handleError");
require("dotenv").config();
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  try {
    const findUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });
    if (findUser) {
      res.status(409).json({ message: "User already exists !!" });
    } else {
      const encryptedPassword = await bcrypt.hash(
        req.body.password,
        SALT_ROUNDS
      );

      const saveUser = await new User({
        ...req.body,
        password: encryptedPassword,
      }).save();
      const token = await createToken(saveUser);
      res.status(200).json({
        userName: saveUser.userName,
        email: saveUser.email,
        token,
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

exports.login = async (req, res) => {
  try {
    const findUser = await User.findOne({
      userName: req.body.userName,
    });
    if (!findUser) {
      res
        .status(400)
        .json({ message: "User does not exist, please register !!" });
    } else {
      const encryptedPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );
      if (encryptedPassword) {
        const token = await createToken(findUser);
        res.status(200).json({
          token,
          user: req.body.userName,
          status: "success",
        });
      } else {
        res.status(500).json({
          message: "Incorrect password, try again !!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

exports.friends = async (req, res) => {
  try {
    const findUser = await User.findOne({
      userName: req.body.userName,
    });
    if (findUser) {
      const friends = await User.findOne(
        { userName: req.body.userName },
        "friends"
      ).populate({
        path: "friends",
      });
      friends.friends.forEach((e) => {
        e.friends = undefined;
        e.messages = undefined;
        e.password = undefined;
      });
      res.json(friends.friends);
    } else throw new Error("User doesn't exist");
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

exports.findUsers = async (req, res) => {
  try {
    const findUsers = await User.find({
      userName: {
        $regex: ".*" + req.body.search + ".*",
        $ne: req.body.userName,
      },
    });
    findUsers.forEach((e) => {
      e.friends = undefined;
      e.messages = undefined;
      e.password = undefined;
    });
    res.json(findUsers);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

exports.addFriend = async (req, res) => {
  try {
    let user;
    const findUser = await User.findOne({
      userName: req.body.add.userName,
    });
    if (findUser) {
      user = await User.findOne({
        userName: req.body.userName,
      });
      if (user.friends.indexOf(req.body.add._id) === -1) {
        user.friends.push(req.body.add);
        user.save();
      }
      if (findUser.friends.indexOf(user._id) === -1) {
        findUser.friends.push(user);
        findUser.save();
      }
    }
    const friends = await User.findOne(
      { userName: req.body.userName },
      "friends"
    ).populate({
      path: "friends",
    });
    friends.friends.forEach((e) => {
      e.friends = undefined;
      e.messages = undefined;
      e.password = undefined;
    });
    res.json(friends.friends);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    let user;
    const findUser = await User.findOne({
      userName: req.body.add.userName,
    });
    if (findUser) {
      user = await User.findOne({
        userName: req.body.userName,
      });
      if (user.friends.indexOf(req.body.add._id) != -1) {
        user.friends.splice(user.friends.indexOf(req.body.add._id), 1);
        user.save();
      }
      if (findUser.friends.indexOf(user._id) != -1) {
        findUser.friends.splice(user.friends.indexOf(req.body.add._id), 1);
        findUser.save();
      }
    }
    const friends = await User.findOne(
      { userName: req.body.userName },
      "friends"
    ).populate({
      path: "friends",
    });
    friends.friends.forEach((e) => {
      e.friends = undefined;
      e.messages = undefined;
      e.password = undefined;
    });
    res.json(await User.findOne(friends.friends));
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
