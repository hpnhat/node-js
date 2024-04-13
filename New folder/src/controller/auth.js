import Joi from "joi";
import auth from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { response } from "express";
const validate = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(0).required(),
});
export const signUp = async (req, res) => {
  try {
    const { error } = validate.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }
    const userExited = await auth.findOne({ email: req.body.email });
    if (userExited) {
      throw new Error("email đã tồn tại");
    }
    const passHash = await bcrypt.hash(req.body.password, 10);
    const userAccount = await auth({
      ...req.body,
      password: passHash,
    }).save();

    return res.status(200).json({ data: userAccount });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
export const signIn = async (req, res) => {
  try {
    const { error } = validate.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }
    const userExited = await auth.findOne({ email: req.body.email });
    if (!userExited) {
      throw new Error("email sai");
    }
    const passHash = await bcrypt.compare(
      req.body.password ,
      userExited.password
    );
    if (!passHash) {
      throw new Error("password sai");
    }
    const token = jwt.sign({ _id: req.params.id }, "HMAC-SHA", {
      expiresIn: "1d",
    });

    return res.status(200).json({ data: userExited, token });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
