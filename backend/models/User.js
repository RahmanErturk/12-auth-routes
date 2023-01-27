import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

export const create = async (data) => {
  const newUser = await userModel.create(data);
  return newUser;
};

export const getOne = async (filter) => {
  const result = await userModel.findOne(filter);
  return result;
};
