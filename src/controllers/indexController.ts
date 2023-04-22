import MagicItem from "../models/magicitem";
import Category from "../models/category";
import OrderInstance from "../models/orderinstance";
import Customer from "../models/customer";
import asyncHandler from "express-async-handler";

export const index = asyncHandler(async (req, res, next) => {
    const [numMagicItems, numCategories, numOrderInstances, numCustomers] =
        await Promise.all([
            MagicItem.countDocuments({}).exec(),
            Category.countDocuments({}).exec(),
            OrderInstance.countDocuments({}).exec(),
            Customer.countDocuments({}).exec(),
        ]);

    res.render("homepage", { 
        layout: "main",
        title: "Sivis Stockpiling and Shipment System",
        header: "Welcome to Sivis Stockpiling and Shipment System",
        numMagicItems,
        numCategories,
        numOrderInstances,
        numCustomers,
    });
});
