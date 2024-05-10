const router = require("express").Router();

// Controller Imports

const User = require("../controllers/user");
const Messages = require("../controllers/messages");

router.get("/", (req, res) =>
  res.send(
    "<p style='font-size:2rem;font-family: Segoe UI;text-align:center'>Socailly Backend Server is Up!! Start making requests</p>"
  )
);

router.post("/register", User.register);
router.post("/login",  User.login);
router.post("/friends", User.friends);
router.post("/findUsers", User.findUsers);
router.post("/addFriend", User.addFriend);
router.post("/deleteFriend", User.deleteFriend);
router.post("/saveMessage", Messages.saveMessage);

module.exports = router;
