const express = require("express");
const {
  insertUser,
  getUserByEmail,
  getUserById,
} = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper");
const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");
const { resetPasswordPin } = require("../model/resetPin/ResetPin.model");
const { emailProcessor } = require("../helpers/email.helper");
const router = express.Router();

router.all("/", (req, res, next) => {
  // res.json({message: "message from the userRouter"})
  next();
});

// Get user profile router

router.get("/", userAuthorization, async (req, res) => {
  //this data comming from database
  //3. extract user id
  //4. get user profile based on the user id - in user router

  //
  const _id = req.userId;
  const userProfile = await getUserById(_id);
  res.json({ user: userProfile });
});

// Create new user router
router.post("/", async (req, res) => {
  const { full_name, email, role, phone, organization } = req.body;

  try {
    const user = {
      full_name,
      email,
      role,
      phone,
      organization,
    };
    console.log(user);
    const result = await insertUser(user);

    console.log(result);
    res.json({ status: "success", message: "new user created" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Create user login router

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ status: "error", message: "invalid form submition" });
  }
  //get user by email from db
  const user = await getUserByEmail(email);
  const passFromDb = user && user._id ? user.password : null;
  if (!passFromDb) {
    return res.json({ status: "error", message: "Invalid email or password" });
  }

  const result = await comparePassword(password, passFromDb);
  if (!result) return res.json({ status: "fail", message: "invaild password" });

  const accessJWT = await createAccessJWT(user.email, `${user._id}`);
  const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);
  res.json({
    status: "success",
    message: "Login Success",
    accessJWT,
    refreshJWT,
  });
});

//A. Create and send password reset pin number
//1. check if user exist for the email
//2. create unique 6 digit pin
//3. save pin and email in database
//4. email the pin

//B. update password in DB
//1. receive email, pin and new password
//2. validate pin
//3. envrypt new password
//4. update password in db
//5 send email notification

//C. Server side from validation
//1. create middleward to validate form data

router.post("/reset-password", async (req, res) => {
  //1. check if user exist for the email
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user && user._id) {
    //2. create unique 6 digit pin
    //3. save pin and email in database
    const setPin = await resetPasswordPin(email);
    //4. email the pin
    const result = await emailProcessor(email, setPin.pin);
    if (result && result.messageId) {
      return res.json({
        status: "success",
        message: "Message sent",
      });
    }

    return res.json(setPin);
  }
  res.json({
    status: "error",
    message:
      "If the email is exist in our database, the password reset pin will be sent shortly",
  });
});

module.exports = router;
