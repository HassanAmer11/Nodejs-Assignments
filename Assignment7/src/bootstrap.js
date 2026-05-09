"use strict";
import express from "express";
import { syncDB, testConnection } from "./DB/connection.js";
import { router as usersRouter } from "./modules/users/users.controller.js";
import { router as postsRouter } from "./modules/posts/posts.controller.js";
import { router as commentRouter } from "./modules/comments/comments.controller.js";
import { userModel } from "./DB/models/user.model.js";
import { postModel } from "./DB/models/post.model.js";
import { commentModel } from "./DB/models/comment.model.js";

import dotenv from "dotenv";

dotenv.config({ path: "./src/config/dev.env" });

const Port = process.env.PORT || 8080;

export const bootstrap = async () => {
  const app = express();

  app.use(express.json());

  // DataBase Connection
  await testConnection();
  await syncDB();

  /**  ---------   users  --------- */
  app.use("/users", usersRouter);

  /**  ---------   posts  --------- */
  app.use("/posts", postsRouter);

  /**  ---------   comments  --------- */
  app.use("/comments", commentRouter);

  app.get("/", (req, res) => {
    return res.status(200).send(
      `<div><a href="http://localhost:3000/users/">http://localhost:3000/users</a></div>
       <div><a href="http://localhost:3000/posts">http://localhost:3000/posts</a></div>
       <div><a href="http://localhost:3000/comments">http://localhost:3000/comments</a></div>`,
    );
  });

  app.all("/*dummy", (req, res) => {
    return res.status(404).json({
      message: "Not Found Handler!",
    });
  });

  app.listen(Port, (error) => {
    if (error) console.log({ "Server Error : ": error.message });
    else console.log(`Server running on http://localhost:${Port} `);
  });
};
