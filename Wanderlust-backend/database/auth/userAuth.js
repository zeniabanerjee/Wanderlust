import { UserModel } from "../../models/signUpModel.js";
import bcrypt from "bcrypt";
import sendMail from "../../controller/sendMail.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { deleteFile } from "../../modules/supportModule.js";
import {
  Response,
  registerData,
  findUser,
  passwordhashed,
  userDetails,
} from "../../modules/supportModule.js";

env.config();

// Mail and Phone number formate
const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneNoFormat = /^\d{10}$/;

// Create user account
export const userRegister = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.status(500).send(Response(null, "Not a valid email!", false));

    if ((await UserModel.findOne({ email: req.body.email })) !== null)
      return res
        .status(500)
        .send(Response(null, "Email already exist!", false));

    if (req.body.phone !== undefined) {
      if (!req.body.phone.match(phoneNoFormat))
        return res
          .status(500)
          .send(Response(null, "Not a valid phone number!", false));

      if ((await UserModel.findOne({ phone: req.body.phone })) !== null)
        return res
          .status(500)
          .send(Response(null, "Phone number already exist!", false));
    }

    const newUser = await UserModel(
      await registerData(
        req.params.user,
        "",
        req.body.email,
        req.body.phone,
        req.body.password,
        false,
        "",
        new Date().getFullYear()
      )
    );
    const result = await newUser.save();
    if (result?._id)
      res
        .status(200)
        .send(Response(newUser, "Account created successfully!", true));
    else
      res.status(500).send(Response(null, "Failed to create account!", false));
  } catch (err) {
    next(err);
  }
};

// Update user details
export const updateUserDetails = async (req, res, next) => {
  try {
    const details = req.body;
    const userData = await UserModel.findOne({ _id: req.params.id });
    if (userData === null)
      return res.status(404).send(null, "User not found!", false);

    let image = userData.userDetails.image;

    if (req.file !== undefined && image !== undefined) {
      const profileImage = userData.userDetails.image.split("/")[4];

      deleteFile("profileImages", profileImage);
    }
    if (req.file !== undefined) {
      image = `http://localhost:7000/profileImage/${req.file.filename}`;
    }
    const data = userDetails(image, details);
    const newDetails = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { userDetails: data } },
      { new: true }
    );
    if (newDetails?._id) {
      return res
        .status(200)
        .send(
          Response(
            { userDetails: newDetails },
            `${req.params.user} details updated successfully.`,
            true
          )
        );
    }
  } catch (err) {
    next(err);
  }
};

// Login user
export const userLogin = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.status(500).send(Response(null, "Not a valid email!", false));

    const user = await findUser(req.body.email);

    if (user.length === 0)
      return res
        .status(500)
        .send(Response(null, `${req.params.user} not found!`, false));
    if (
      req.params.user !== user[0].userType &&
      user[0].userType === "Frontend-user"
    )
      return res
        .status(500)
        .send(Response(null, `Not a ${req.params.user}!`, false));
    else {
      const isMatched = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isMatched) {
        const result = await UserModel.findOneAndUpdate(
          {
            _id: user[0]._id,
          },
          {
            $set: {
              isActive: true,
            },
          },
          { new: true }
        );
        const payload = { userDetails: result };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return res
          .status(200)
          .send(
            Response(
              { userDetails: result, token: token },
              "Login Sucessfull!",
              true
            )
          );
      } else {
        return res.status(500).send(Response(null, "Wrong password!", false));
      }
    }
  } catch (err) {
    next(err);
  }
};

// Logout user
export const userLogout = async (req, res, next) => {
  try {
    const user = await findUser(req.body.email);
    const result = await UserModel.findOneAndUpdate(
      {
        _id: user[0]._id,
      },
      {
        $set: {
          isActive: false,
        },
      },
      { new: true }
    );
    if (result)
      return res
        .status(200)
        .send(Response(null, "Logged out successfully!", true));
    else
      return res.status(500).send(Response(null, "Failed to logout!", false));
  } catch (err) {
    next(err);
  }
};

// Get all users by user type
export const userData = async (req, res, next) => {
  try {
    const user = await UserModel.find({ userType: req.params.user });
    return res
      .status(200)
      .send(Response(user, `All ${req.params.user}s are here...`, true));
  } catch (err) {
    next(err);
  }
};

// Get a particular user
export const userDataById = async (req, res, next) => {
  const { id, user } = req.params;
  try {
    const userData = await UserModel.findOne({
      _id: id,
      userType: user,
    });
    if (userData === null)
      return res.status(404).send(Response(null, `${user}  not found!`, false));
    return res
      .status(200)
      .send(Response(userData, `${user}s all details are here...`, true));
  } catch (err) {
    next(err);
  }
};

// Send reset password email
export const sendResetMail = async (req, res, next) => {
  try {
    if (!req.body.email.match(emailFormat))
      return res.status(500).send(Response(null, "Not a valid email!", false));

    const user = await findUser(req.body.email);
    if (user.length === 0)
      return res
        .status(500)
        .send(Response(null, `${req.params.user} not found!`, false));
    if (
      user[0].userType === "Frontend-user" &&
      req.params.user !== user[0].userType
    )
      return res
        .status(500)
        .send(Response(null, `Not an ${req.params.user}!`, false));

    let secret = process.env.JWT_SECRET;
    if (user[0].userType === "Admin" || user[0].userType === "Frontend-user") {
      secret = process.env.JWT_SECRET + user[0].password;
    }
    const userName =
      user[0].userDetails.name === undefined ? "" : user[0].userDetails.name;
    const payload = {
      email: req.body.email,
      id: user[0]._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:${req.body.port}/token-validation/${req.params.user}/${user[0]._id}/${token}`;
    if (await sendMail(userName, req.body.email, link))
      return res
        .status(500)
        .send(Response(null, "Failed to send mail!", false));
    else
      return res
        .status(200)
        .send(Response(link, `Email send to ${req.body.email}`, true));
  } catch (err) {
    next(err);
  }
};

// One time token validation
export const tokenValidation = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    const user = await UserModel.find({ _id: id });
    if (user.length === 0)
      return res
        .status(500)
        .send(Response(null, `${req.params.user} not found!`, false));

    if (
      user[0].userType === "Frontend-user" &&
      req.params.user !== user[0].userType
    )
      return res
        .status(500)
        .send(Response(null, `Not a ${req.params.user}!`, false));

    let secret = process.env.JWT_SECRET;
    if (user[0].userType === "Admin" || user[0].userType === "Frontend-user") {
      secret = process.env.JWT_SECRET + user[0].password;
    }
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        return res.status(500).send(Response(null, "Not authenticate!", false));
      } else {
        return res
          .status(200)
          .send(
            Response(
              { email: user[0].email },
              `${req.params.user} verified.`,
              true
            )
          );
      }
    });
  } catch (err) {
    next(err);
  }
};

// Set password
export const setPassword = async (req, res, next) => {
  try {
    const user = await UserModel.find({ _id: req.body.id });
    if (user.length === 0)
      return res.status(500).send(Response(null, "User not found!", false));
    let secret = process.env.JWT_SECRET;
    if (user[0].userType === "Admin" || user[0].userType === "Frontend-user")
      secret = process.env.JWT_SECRET + user[0].password;
    try {
      let payload = { id: "" };
      if (!req.body?.logInStatus) {
        payload = await jwt.verify(req.body.token, secret);
      } else {
        payload.id = req.body.id;
      }

      const result = await UserModel.findOneAndUpdate(
        { _id: payload.id },
        { $set: { password: await passwordhashed(req.body.newPassword) } },
        { new: true }
      );
      if (result)
        return res
          .status(200)
          .send(Response(null, "Password reset successfully.", true));
      else
        return res
          .status(500)
          .send(Response(null, "Reset password failed!", false));
    } catch (err) {
      return res
        .status(500)
        .send(Response(null, "Token validation failed!", false));
    }
  } catch (err) {
    next(err);
  }
};
