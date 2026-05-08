import { where } from "sequelize";
import { userModel } from "../../DB/models/user.model.js";

export const createNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const checkEmailExist = await userModel.findOne({
      where: { email },
    });
    if (checkEmailExist) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const newUser = await userModel.build({ name, email, password, role });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User Added Successfully", data: newUser });
  } catch (error) {
    const { message } = error?.errors[0];
    return res.status(500).json({ message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const { id } = req.params;
  try {
    const user = await userModel.findByPk(id);
    if (!user) {
      const newUser = await userModel.create({ name, email, password, role });
      return res.status(200).json({
        message: "User Added Successfully",
        data: newUser,
      });
    }
    const updatedUser = await user.update(
      { name, email, password, role },
      {
        where: { id },
      },
    );
    return res
      .status(200)
      .json({ message: "User Data Updated Successfully", data: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.errors[0].message });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  console.log(email);
  try {
    const user = await userModel.findOne({where:{email}});
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "Done", User: user });
  } catch (error) {
    return res.status(500).json({ message: error.errors[0].message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByPk(id, {
      attributes: {
        exclude:['role']
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "Done", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.errors[0].message });
  }
};
/*
export const getAllUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userModel.findAll();
    return res.status(200).json({ message: "Done", data: users });
  } catch (error) {
    return res.status(500).json({ message: error?.errors[0]?.message });
  }
};

export const deleteUser = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const user = await userModel.destroy({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User Not Found", data: user });
    }
    return res
      .status(200)
      .json({ message: "User Deleted Successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.errors[0].message });
  }
};
*/