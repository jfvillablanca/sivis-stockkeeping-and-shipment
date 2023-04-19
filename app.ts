import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
