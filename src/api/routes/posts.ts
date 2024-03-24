import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { Router } from "express";
import prisma from "../prisma/client";

var router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("", async (req, res, next) => {
  if (!req.body.title || req.body.title === "") {
    res.status(400).send("Invalid post name!");
    return;
  }
  if (!req.body.content || req.body.content === "") {
    res.status(400).send("Invalid post content!");
    return;
  }
  prisma.post
    .create({
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    })
    .then((value) => {
      res.send(value);
    })
    .catch((reason) => {
      res.status(400).send(reason);
    });
});

export const postsRouter = router;
