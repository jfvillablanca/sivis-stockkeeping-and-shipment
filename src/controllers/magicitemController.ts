import MagicItem from "../models/magicitem";
import asyncHandler from "express-async-handler";

// Display list of all Magic Items.
export const magicitem_list = asyncHandler(async (req, res, next) => {
    const allMagicItems = await MagicItem.find()
        .lean({ virtuals: true })
        .sort({ item_name: 1 })
        .exec();

    res.render("magicitem_list", {
        layout: "main",
        title: "Magic Item List",
        header: "Magic Item List",
        list: allMagicItems.map((item) => {
            return {
                ...item,
                name: item.item_name,
            };
        }),
    });
});

// Display detail page for a specific magic item.
export const magicitem_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: magicitem detail: ${req.params.id}`);
});

// Display magic item create form on GET.
export const magicitem_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem create GET");
});

// Handle magic item create on POST.
export const magicitem_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem create POST");
});

// Display magic item delete form on GET.
export const magicitem_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem delete GET");
});

// Handle magic item delete on POST.
export const magicitem_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem delete POST");
});

// Display magic item update form on GET.
export const magicitem_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem update GET");
});

// Handle magic item update on POST.
export const magicitem_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem update POST");
});
