import express, { Express, NextFunction, Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import dotenv from "dotenv";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";

dotenv.config();

import { router as indexRouter } from "./routes/index";

const app: Express = express();
const port = process.env.PORT;

app.engine(
    ".hbs",
    engine({
        defaultLayout: "index",
        extname: ".hbs",
        layoutsDir: path.join(__dirname, "views"),
        partialsDir: path.join(__dirname, "views/partials"),
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

app.use(function (
    err: createError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
