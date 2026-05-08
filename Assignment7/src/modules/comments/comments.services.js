import { commentModel } from "../../DB/models/comment.model.js";
import { postModel } from "../../DB/models/post.model.js";
import { userModel } from "../../DB/models/user.model.js";

export const createBulkComments = async (req, res) => {
  try {
    const { comments } = req.body;
    const newComments = await commentModel.bulkCreate(comments);
    res.status(200).json({ message: "comments created", newComments });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const { commentId } = req.params;
    //check user exist
    const user = await userModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User Not Found." });
    //check comment exist
    const comment = await commentModel.findByPk(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment Not Found." });

    //check if user authorized to update this comment
    if (comment.userId !== user.id)
      return res
        .status(404)
        .json({ message: "You are not authorized to update this comment." });

    const updatedComments = await commentModel.update(
      { content },
      {
        where: {
          id: commentId,
        },
      },
    );
    res.status(200).json({ message: "comment updated", updatedComments });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createOrFind = async (req, res) => {
    const { userId, postId, content } = req.body;
    const comment = await commentModel.findOrCreate({
      where: { userId, postId, content },
    });
    return res.status(200).json({ message: "Done", comment });

};

