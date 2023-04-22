import express from "express";
import {
    orderinstance_create_get,
    orderinstance_create_post,
    orderinstance_delete_get,
    orderinstance_delete_post,
    orderinstance_list,
    orderinstance_update_get,
    orderinstance_update_post,
} from "../controllers/orderinstanceController";
import {
    magicitem_create_get,
    magicitem_create_post,
    magicitem_delete_get,
    magicitem_delete_post,
    magicitem_list,
    magicitem_update_get,
    magicitem_update_post,
} from "../controllers/magicitemController";
import {
    customer_create_get,
    customer_create_post,
    customer_delete_get,
    customer_delete_post,
    customer_list,
    customer_update_get,
    customer_update_post,
} from "../controllers/customerController";
import {
    category_create_get,
    category_create_post,
    category_delete_get,
    category_delete_post,
    category_list,
    category_update_get,
    category_update_post,
} from "../controllers/categoryController";
export const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("main", { layout: "index" });
});

router.get("/order-instances", orderinstance_list);

router.get("/order-instance/create", orderinstance_create_get);

router.post("/order-instance/create", orderinstance_create_post);

router.get("/order-instance/:id/delete", orderinstance_delete_get);

router.post("/order-instance/:id/delete", orderinstance_delete_post);

router.get("/order-instance/:id/update", orderinstance_update_get);

router.post("/order-instance/:id/update", orderinstance_update_post);


router.get("/magic-items", magicitem_list);

router.get("/magic-item/create", magicitem_create_get);

router.post("/magic-item/create", magicitem_create_post);

router.get("/magic-item/:id/delete", magicitem_delete_get);

router.post("/magic-item/:id/delete", magicitem_delete_post);

router.get("/magic-item/:id/update", magicitem_update_get);

router.post("/magic-item/:id/update", magicitem_update_post);


router.get("/customers", customer_list);

router.get("/customer/create", customer_create_get);

router.post("/customer/create", customer_create_post);

router.get("/customer/:id/delete", customer_delete_get);

router.post("/customer/:id/delete", customer_delete_post);

router.get("/customer/:id/update", customer_update_get);

router.post("/customer/:id/update", customer_update_post);


router.get("/categories", category_list);

router.get("/category/create", category_create_get);

router.post("/category/create", category_create_post);

router.get("/category/:id/delete", category_delete_get);

router.post("/category/:id/delete", category_delete_post);

router.get("/category/:id/update", category_update_get);

router.post("/category/:id/update", category_update_post);
