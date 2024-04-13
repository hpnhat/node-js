import Joi from "joi";
import product from "../models/product.js";

const validate = Joi.object({
  name: Joi.string().min(6).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(1).required(),
});

export const create = async (req, res) => {
  try {
    const { error } = validate.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }
    const data = await product(req.body).save();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
export const getAll = async (req, res) => {
  try {
    const data = await product.find();
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
export const getDetail = async (req, res) => {
  try {
    const data = await product.findById(req.params.id);
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = validate.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ error: errors });
    }
    const data = await product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
