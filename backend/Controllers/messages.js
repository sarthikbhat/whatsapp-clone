const User = require("../models/user");
const handleError = require("../utils/handleError");
require("dotenv").config();

exports.saveMessage = async (req, res) => {
  try {
    const findUser = await User.findOne({ userName: req.body.to });
    if (findUser) {
        findUser.messages.push(req.body)
        await findUser.save()
         res.json(await User.findOne({ userName: req.body.to }).sort({messages:1}));
    }
    else throw new Error("User not registered, please register first")
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
};
