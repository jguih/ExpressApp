"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./api/routes");
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const process_1 = require("process");
const posts_1 = require("./api/routes/posts");
var app = (0, express_1.default)();
// view engine setup
app.set("views", path_1.default.join((0, process_1.cwd)(), "/src/views"));
app.set("view engine", "pug");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/styles", express_1.default.static(path_1.default.join((0, process_1.cwd)(), "/dist/stylesheets")));
app.use("/js", express_1.default.static(path_1.default.join((0, process_1.cwd)(), "/public/js")));
app.use("/", routes_1.indexRouter);
app.use("/posts", posts_1.postsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.listen(3000, () => {
    console.log("App listening on port 3000.");
});
