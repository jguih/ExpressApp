import express from "express";
import path from "path";
import { indexRouter } from "./api/routes";
import morgan from "morgan";
import createHttpError from "http-errors";
import { cwd } from "process";
import { postsRouter } from "./api/routes/posts";

var app = express();

// view engine setup
app.set("views", path.join(cwd(), "/src/views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/styles", express.static(path.join(cwd(), "/dist/stylesheets")));

app.use("/", indexRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

app.listen(3000, () => {
  console.log("App listening on port 3000.");
});
