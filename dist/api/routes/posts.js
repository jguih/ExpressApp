"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const client_1 = __importDefault(require("../prisma/client"));
const render_1 = require("../handler/render");
var router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.post("/", (req, res, next) => {
    if (!req.body.title || req.body.title === "") {
        (0, render_1.render)(req, res).page.error("Invalid post name!");
        return;
    }
    if (!req.body.content || req.body.content === "") {
        (0, render_1.render)(req, res).page.error("Invalid post content!");
        return;
    }
    client_1.default.post
        .create({
        data: {
            title: req.body.title,
            content: req.body.content,
        },
    })
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        // Send rendered list of all posts intead of redirecting.
        const posts = yield client_1.default.post.findMany();
        (0, render_1.render)(req, res).partial.postsList(posts);
    }))
        .catch((reason) => {
        res.status(400).send(reason);
    });
});
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Send a list containing all posts
    const posts = yield client_1.default.post.findMany();
    (0, render_1.render)(req, res).partial.postsList(posts);
}));
router.delete("/:postId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    client_1.default.post
        .delete({
        where: {
            id: Number(postId),
        },
    })
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).send();
    }))
        .catch((err) => {
        res.status(400).send(err);
    });
}));
exports.postsRouter = router;
