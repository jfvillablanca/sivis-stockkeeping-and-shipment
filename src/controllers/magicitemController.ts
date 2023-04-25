import { RequestHandler } from "express";
import Category from "../models/category";
import MagicItem, { MagicItemSchema } from "../models/magicitem";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import OrderInstance from "../models/orderinstance";

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
export const magicitem_create_post: RequestHandler[] = [
    body("name", "The magic item name must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("description", "The description must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("category.*").escape(),
    body("price", "The price must be a nonnegative integer")
        .trim()
        .isInt({ min: 0, allow_leading_zeroes: false })
        .escape(),
    body("stock", "The stock must be a nonnegative integer")
        .trim()
        .isInt({ min: 0, allow_leading_zeroes: false })
        .escape(),
    body("rarity.*").escape(),
    asyncHandler(async (req, res, next) => {
        const reqMagicItem = {
            item_name: req.body.name,
            description: req.body.description,
            category: await Category.findOne({
                name: req.body.category,
            }).exec(),
            price: req.body.price,
            stock: req.body.stock,
            rarity: req.body.rarity,
        };

        const errors = validationResult(req);
        const magicitem = new MagicItem({
            item_name: reqMagicItem.item_name,
            description: reqMagicItem.description,
            category: reqMagicItem.category,
            price: reqMagicItem.price,
            stock: reqMagicItem.stock,
            rarity: reqMagicItem.rarity,
        });

        const rarityEnumValues = MagicItemSchema.path("rarity").options.enum;
        const categoryEnumValues = (
            await Category.find().sort({ name: 1 }).exec()
        ).map((category) => category.name);

        if (!errors.isEmpty()) {
            res.render("magicitem_form", {
                layout: "main",
                title: "Create new magic item",
                header: "Create new magic item",
                rarityEnumValues: rarityEnumValues,
                categoryEnumValues: categoryEnumValues,
                magicitem: {
                    ...reqMagicItem,
                    category: reqMagicItem.category?.name,
                },
                errors: errors.array(),
            });
            return;
        } else {
            const magicItemExists = await MagicItem.findOne({
                item_name: reqMagicItem.item_name,
                description: reqMagicItem.description,
                category: reqMagicItem.category,
                price: reqMagicItem.price,
                stock: reqMagicItem.stock,
                rarity: reqMagicItem.rarity,
            })
                .lean({ virtuals: true })
                .exec();
            if (magicItemExists) {
                res.redirect(magicItemExists.url);
            } else {
                await magicitem.save();
                res.redirect(magicitem.url);
            }
        }
    }),
];

// Display magic item delete form on GET.
export const magicitem_delete_get = asyncHandler(async (req, res, next) => {
    const [magicitem, allOrderInstancesByMagicItem] = await Promise.all([
        MagicItem.findById(req.params.id).lean({ virtuals: true }).exec(),
        OrderInstance.find({ "orderArray.magic_item": req.params.id })
            .populate("orderArray.magic_item")
            .lean({ virtuals: true })
            .exec(),
    ]);

    res.render("magicitem_delete", {
        layout: "main",
        title: `Delete magic item`,
        header: "Delete",
        magicitem: magicitem,
        magicitems_orderinstances: allOrderInstancesByMagicItem,
    });
});

// Handle magic item delete on POST.
export const magicitem_delete_post = asyncHandler(async (req, res, next) => {
    const [magicitem, allOrderInstancesByMagicItem] = await Promise.all([
        MagicItem.findById(req.params.id).lean({ virtuals: true }).exec(),
        OrderInstance.find({ "orderArray.magic_item": req.params.id })
            .populate("orderArray.magic_item")
            .lean({ virtuals: true })
            .exec(),
    ]);

    if (allOrderInstancesByMagicItem.length > 0) {
        res.render("magicitem_delete", {
            layout: "main",
            title: `Delete magic item`,
            header: "Delete",
            magicitem: magicitem,
            magicitems_orderinstances: allOrderInstancesByMagicItem,
        });
    } else {
        await MagicItem.findByIdAndRemove(req.body.magicitemid);
        res.redirect("/magic-items");
    }
});

// Display magic item update form on GET.
export const magicitem_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem update GET");
});

// Handle magic item update on POST.
export const magicitem_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: magicitem update POST");
});
