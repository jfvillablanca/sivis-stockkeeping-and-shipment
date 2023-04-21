import Customer from "../models/customer";
import asyncHandler from "express-async-handler";

// Display list of all Customers.
export const customer_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer list");
});

// Display detail page for a specific Customer.
export const customer_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Customer detail: ${req.params.id}`);
});

// Display Customer create form on GET.
export const customer_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer create GET");
});

// Handle Customer create on POST.
export const customer_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer create POST");
});

// Display Customer delete form on GET.
export const customer_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer delete GET");
});

// Handle Customer delete on POST.
export const customer_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer delete POST");
});

// Display Customer update form on GET.
export const customer_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer update GET");
});

// Handle Customer update on POST.
export const customer_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Customer update POST");
});
