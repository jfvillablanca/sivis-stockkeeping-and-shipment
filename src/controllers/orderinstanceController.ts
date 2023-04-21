import OrderInstance from "../models/orderinstance";
import asyncHandler from "express-async-handler";

// Display list of all Order Instances.
export const orderinstance_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance list");
});

// Display detail page for a specific Order Instance.
export const orderinstance_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Order Instance detail: ${req.params.id}`);
});

// Display Order Instance create form on GET.
export const orderinstance_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance create GET");
});

// Handle Order Instance create on POST.
export const orderinstance_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance create POST");
});

// Display Order Instance delete form on GET.
export const orderinstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance delete GET");
});

// Handle Order Instance delete on POST.
export const orderinstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance delete POST");
});

// Display Order Instance update form on GET.
export const orderinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance update GET");
});

// Handle Order Instance update on POST.
export const orderinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance update POST");
});
