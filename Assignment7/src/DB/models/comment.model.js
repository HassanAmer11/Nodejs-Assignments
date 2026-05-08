import { DataTypes } from "sequelize";
import { sequelDB } from "../connection.js";
import { userModel } from "./user.model.js";
import { postModel } from "./post.model.js";

export const commentModel = sequelDB.define("comments",
    {
        content: {
            type: DataTypes.TEXT,
            allowNull:false,
            validate: {
                notNull: true,
                notEmpty:true,
            }
        }
    },
    {
        timestamps: true,
        paranoid:true,
    }
)

userModel.hasMany(commentModel, {
  foreignKey: "userId",
});

commentModel.belongsTo(userModel, {
  foreignKey: "userId",
});

postModel.hasMany(commentModel, {
  foreignKey: "postId",
});

commentModel.belongsTo(postModel, {
  foreignKey: "postId",
});

