import { DataTypes } from "sequelize";
import { sequelDB } from "../connection.js";
import { userModel } from "./user.model.js";

export const postModel = sequelDB.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        min: {
          args: 10,
          msg: "title length Must be Greater Than 10 Characters",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: {
          args: 20,
          msg: "Post Content Must be Greater Than 20 Characters",
        },
        max: {
          args: 1000,
          msg: "Post Content Must be Less Than 1000 Characters",
        },
      },
    },
  },
  {
    paranoid: true,
    timestamps: true,
  },
);

userModel.hasMany(postModel, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

postModel.belongsTo(userModel, {
  foreignKey: "userId",
});
