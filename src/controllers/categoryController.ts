import { RequestHandler } from "express";
import Category from "../models/category";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

// Display list of all Categories.
export const category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find()
        .lean({ virtuals: true })
        .sort({ name: 1 })
        .exec();

    res.render("category_list", {
        layout: "main",
        title: "Category List",
        header: "Category List",
        list: allCategories,
    });
});

// Display detail page for a specific Category.
export const category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
        .lean({ virtuals: true })
        .exec();

    res.render("category_detail", {
        layout: "main",
        title: "Category Detail",
        header: "Category Detail",
        category,
    });
});

// Display Category create form on GET.
export const category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", {
        layout: "main",
        title: "Create new category",
        header: "Create new category",
    });
});

// Handle Category create on POST.
export const category_create_post: RequestHandler[] = [
    body("name", "Category name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const category = new Category({ name: req.body.name });

        if (!errors.isEmpty()) {
            res.render("category_form", {
                layout: "main",
                title: "Create new category",
                header: "Create new category",
                errors: errors.array(),
            });
            return;
        } else {
            const categoryExists = await Category.findOne({
                name: req.body.name,
            })
                .lean({ virtuals: true })
                .exec();
            if (categoryExists) {
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                res.redirect(category.url);
            }
        }
    }),
];

// Display Category delete form on GET.
export const category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
});

// Handle Category delete on POST.
export const category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete POST");
});

// Display Category update form on GET.
export const category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update GET");
});

// Handle Category update on POST.
export const category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update POST");
});
