import { DataTypes, VIRTUAL } from "sequelize";
import { sequelDB } from "../connection.js";

export const userModel = sequelDB.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Name is Required",
        },
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is Required",
        },
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error(
              "password length must be greater than 6 characters.",
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      validate: {
        isIn: {
          args: ["user", "admin"],
          msg:"role must be in  ['user', 'admin']"
        },
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
        name: "email_index",
      },
    ],
  },
);
