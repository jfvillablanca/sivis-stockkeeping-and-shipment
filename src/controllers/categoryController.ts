import Category from "../models/category";
import asyncHandler from "express-async-handler";

// Display list of all Categories.
export const category_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category list");
});

// Display detail page for a specific Category.
export const category_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
});

// Display Category create form on GET.
export const category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle Category create on POST.
export const category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
});

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
