import express from "express";
export const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Typescript + Express",
        text: "Welcome text",
    });
});
