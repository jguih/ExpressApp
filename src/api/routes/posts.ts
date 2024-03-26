import bodyParser from "body-parser";
import { Router } from "express";
import prisma from "../prisma/client";
import { render } from "../handler/render";

var router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  if (!req.body.title || req.body.title === "") {
    render(req, res).page.error("Invalid post name!");
    return;
  }
  if (!req.body.content || req.body.content === "") {
    render(req, res).page.error("Invalid post content!");
    return;
  }
  prisma.post
    .create({
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    })
    .then(async () => {
      // Send rendered list of all posts intead of redirecting.
      const posts = await prisma.post.findMany();
      render(req, res).partial.postsList(posts);
    })
    .catch((reason) => {
      res.status(400).send(reason);
    });
});

router.get("/", async (req, res, next) => {
  // Send a list containing all posts
  const posts = await prisma.post.findMany();
  render(req, res).partial.postsList(posts);
});

router.delete("/:postId", async (req, res, next) => {
  const { postId } = req.params;
  prisma.post
    .delete({
      where: {
        id: Number(postId),
      },
    })
    .then(async () => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export const postsRouter = router;
