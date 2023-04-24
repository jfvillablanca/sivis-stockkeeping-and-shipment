import Category from "../models/category";
import MagicItem, { MagicItemSchema } from "../models/magicitem";
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
    const magicitem = await MagicItem.findById(req.params.id)
        .lean({ virtuals: true })
        .exec();

    const categoryOfMagicItem = magicitem?.category
        ? await Category.findById(magicitem.category)
              .lean({ virtuals: true })
              .exec()
        : {};

    res.render("magicitem_detail", {
        layout: "main",
        title: "Magic Item Detail",
        header: "Magic Item Detail",
        magicitem: { ...magicitem, category: categoryOfMagicItem },
    });
});

// Display magic item create form on GET.
export const magicitem_create_get = asyncHandler(async (req, res, next) => {
    const rarityEnumValues = MagicItemSchema.path("rarity").options.enum;
    const categoryEnumValues = (
        await Category.find().sort({ name: 1 }).exec()
    ).map((category) => category.name);

    res.render("magicitem_form", {
        layout: "main",
        title: "Create new magic item",
        header: "Create new magic item",
        rarityEnumValues: rarityEnumValues,
        categoryEnumValues: categoryEnumValues,
    });
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
