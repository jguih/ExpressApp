import { Post } from "@prisma/client";
import { Request, Response } from "express";

export const render = (req: Request, res: Response) => {
  return {
    page: {
      error: (message: string) => {
        res.status(400).render("pages/error", { message: message });
      },
    },
    partial: {
      post: (post: Post | null) => {
        if (post) {
          res.render("partials/post", { post: post });
          return;
        }
        res.status(200).send("");
      },
      postsList: (posts: Post[]) => {
        res.render("partials/posts-list", { posts: posts });
      },
    },
  };
};
