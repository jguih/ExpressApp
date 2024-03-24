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
var router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.post("", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || req.body.title === "") {
        res.status(400).send("Invalid post name!");
        return;
    }
    if (!req.body.content || req.body.content === "") {
        res.status(400).send("Invalid post content!");
        return;
    }
    client_1.default.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
        }
    }).then((value) => {
        res.send(value);
    }).catch((reason) => {
        res.status(400).send(reason);
    });
}));
exports.postsRouter = router;
