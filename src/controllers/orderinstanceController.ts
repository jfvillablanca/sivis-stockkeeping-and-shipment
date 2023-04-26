import { RequestHandler } from "express";
import OrderInstance from "../models/orderinstance";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import MagicItem from "../models/magicitem";

// Display list of all Order Instances.
export const orderinstance_list = asyncHandler(async (req, res, next) => {
    const allOrderInstances = await OrderInstance.find()
        .populate("orderArray.magic_item")
        .lean({ virtuals: true })
        .exec();

    res.render("orderinstance_list", {
        layout: "main",
        title: "Order Instance List",
        header: "Order Instance List",
        list: allOrderInstances,
    });
});

// Display detail page for a specific Order Instance.
export const orderinstance_detail = asyncHandler(async (req, res, next) => {
    const orderinstance = await OrderInstance.findById(req.params.id)
        .populate("orderArray.magic_item")
        .lean({ virtuals: true })
        .exec();

    res.render("orderinstance_detail", {
        layout: "main",
        title: "Order Instance Detail",
        header: "Order Instance Detail",
        orderinstance,
    });
});

// Display Order Instance create form on GET.
export const orderinstance_create_get = asyncHandler(async (req, res, next) => {
    const magicItemEnumValues = (
        await MagicItem.find().sort({ item_name: 1 }).exec()
    ).map((magicitem) => magicitem.item_name);

    res.render("orderinstance_form", {
        layout: "main",
        title: "Create new order instance",
        header: "Create new order instance",
        magicItemEnumValues,
    });
});

// Handle Order Instance create on POST.
export const orderinstance_create_post: RequestHandler[] = [
    body("magic_item.*").escape(),
    body("order_quantity", "Order quantity must be a minimum value of 1")
        .trim()
        .isInt({ min: 1, allow_leading_zeroes: false })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const orderinstance = new OrderInstance({
            orderArray: [
                {
                    magic_item: await MagicItem.findOne({
                        item_name: req.body.magic_item,
                    }).exec(),
                    order_quantity: req.body.order_quantity,
                },
            ],
        });

        if (!errors.isEmpty()) {
            const magicItemEnumValues = (
                await MagicItem.find().sort({ item_name: 1 }).exec()
            ).map((magicitem) => magicitem.item_name);

            res.render("orderinstance_form", {
                layout: "main",
                title: "Create new order instance",
                header: "Create new order instance",
                magicItemEnumValues,
                errors: errors.array(),
            });
            return;
        } else {
            await orderinstance.save();
            res.redirect(orderinstance.url);
        }
    }),
];

// Display Order Instance delete form on GET.
export const orderinstance_delete_get = asyncHandler(async (req, res, next) => {
    const orderinstance = await OrderInstance.findById(req.params.id)
        .populate("orderArray.magic_item")
        .lean({ virtuals: true })
        .exec();

    res.render("orderinstance_delete", {
        layout: "main",
        title: `Delete Order Instance`,
        header: "Delete Order No",
        orderinstance,
    });
});

// Handle Order Instance delete on POST.
export const orderinstance_delete_post = asyncHandler(
    async (req, res, next) => {
        await OrderInstance.findByIdAndRemove(req.body.orderinstanceid);
        res.redirect("/order-instances");
    }
);

// Display Order Instance update form on GET.
export const orderinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance update GET");
});

// Handle Order Instance update on POST.
export const orderinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Order Instance update POST");
});
