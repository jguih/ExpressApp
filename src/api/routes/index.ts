import { Router } from "express";

var router = Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("pages/index");
});

export const indexRouter = router;
