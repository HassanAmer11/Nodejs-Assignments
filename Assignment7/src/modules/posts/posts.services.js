import { col, fn } from "sequelize";
import { commentModel } from "../../DB/models/comment.model.js";
import { postModel } from "../../DB/models/post.model.js";
import { userModel } from "../../DB/models/user.model.js";

export const createNewPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const newPost = await postModel.create({ userId, title, content });
    return res
      .status(201)
      .json({ message: "Post Created Successfully", Post: newPost });
  } catch (error) {
    return res.status(500).json({ message: error});
  }
};

export const deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;
    //check user exist
    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User Not Found." });
    //check post exist
    const post = await postModel.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post Not Found." });

    //check if user authorized to delete this post
    if (post.userId !== user.id)
      return res
        .status(404)
        .json({ message: "You are not authorized to delete this post." });

    // Delete the Post
    const deletedPost = await postModel.destroy({
      where: { id: postId, userId },
    });
    const message = deletedPost == 1 ? "Post Deleted." : " Post not Deleted";
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getPostsDetails = async (req, res) => {
  try {
      const posts = await postModel.findAll({
          include: [{
              model: userModel,
              attributes:['id','name']
          }, {
              model: commentModel,
              attributes:['id','content']
        }],
        attributes: ["id", "title"],
      });

    return res.status(200).json({ message: "Done", posts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const commentsPostCount = async (req, res) => {
  try {
const posts = await postModel.findAll({
  attributes: [
    "id",
    "title",
    [fn("COUNT", col("comments.id")), "commentsCount"],
  ],
  include: [
    {
      model: commentModel,
      attributes: [], // don't return comment rows
    },
  ],
});

    return res.status(200).json({ message: "Done", posts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
