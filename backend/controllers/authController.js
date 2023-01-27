import bcrypt from "bcrypt";
import * as authModel from "../models/User.js";

export const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  try {
    const newUser = await authModel.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({ email: newUser.email, id: newUser._id });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

export const login = async (req, res) => {
  const user = await authModel.getOne({ email: req.body.email });
  console.log(user);

  if (!user) {
    res.status(404).send("Login nicht erfolgreich");
    return;
  }

  const isPasswordEqual = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordEqual) {
    res.status(200).json({ email: user.email, id: user._id });
  } else {
    res.status(400).json("Login nicht erfolgreich");
  }
};
