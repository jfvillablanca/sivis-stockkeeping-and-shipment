import express from "express";
export const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("main", { layout: "index" });
});

router.get("/foo", function (req, res, next) {
    res.render("main", { layout: "index" });
});
