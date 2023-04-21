#! /usr/bin/env node

console.log(
    'This script populates some test magic items, customers, magic item categories and order instances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const MagicItem = require("../dist/models/magicitem").default;
const Customer = require("../dist/models/customer").default;
const Category = require("../dist/models/category").default;
const OrderInstance = require("../dist/models/orderinstance").default;

// const Rarity = require("./dist/models/rarity");

// import MagicItem from "./dist/models/magicitem";
// import Customer from "./dist/models/customer";
// import Category from "./dist/models/category";
// import OrderInstance from "./dist/models/orderinstance";

const categories = [];
const rarities = ["Common", "Uncommon", "Rare", "Very rare", "Legendary"];
const customers = [];
const magicItems = [];
const orderInstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    // await createRarities();
    await createCustomers();
    await createMagicItems();
    await createOrderInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(name) {
    const category = new Category({ name: name });
    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
}

// async function rarityCreate(name) {
//     const rarity = new Rarity({ name: name });
//     await rarity.save();
//     rarities.push(rarity);
//     console.log(`Added rarity: ${name}`);
// }

async function customerCreate(first_name, family_name) {
    const customer = new Customer({
        first_name: first_name,
        family_name: family_name,
    });

    await customer.save();
    customers.push(customer);
    console.log(`Added customer: ${first_name} ${family_name}`);
}

async function magicItemCreate({
    item_name,
    description,
    category,
    price,
    stock,
    rarity,
}) {
    const magicItem = new MagicItem({
        item_name,
        description,
        category,
        price,
        stock,
        rarity,
    });
    await magicItem.save();
    magicItems.push(magicItem);
    console.log(`Added magic item: ${item_name}`);
}

async function orderInstanceCreate(orderArray) {
    const orderInstance = new OrderInstance({ orderArray });
    await orderInstance.save();
    orderInstances.push(orderInstance);
    console.log(`Added order instance with length: ${orderArray.length}`);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate("Weapon"),
        categoryCreate("Armor"),
        categoryCreate("Potion"),
        categoryCreate("Scroll"),
        categoryCreate("Wondrous Item"),
    ]);
}

// async function createRarities() {
//     console.log("Adding rarities");
//     await Promise.all([
//         rarityCreate("Common"),
//         rarityCreate("Uncommon"),
//         rarityCreate("Rare"),
//         rarityCreate("Very rare"),
//         rarityCreate("Legendary"),
//     ]);
// }
async function createCustomers() {
    console.log("Adding customers");
    await Promise.all([
        customerCreate("Torin", "Stoneforge"),
        customerCreate("Erevan", "Moonshadow"),
        customerCreate("Niamh", "Silverblade"),
        customerCreate("Sariel", "Blowblacker"),
        customerCreate("Leif", "Joahn"),
    ]);
}

async function createMagicItems() {
    console.log("Adding magic items");
    await Promise.all([
        magicItemCreate({
            item_name: "The Staff of Winter's Chill",
            description:
                "This staff is made of gnarled oak and is adorned with blue gemstones. When wielded, it exudes a cold aura that chills the air around it.",
            category: categories[0],
            price: 500,
            stock: 1,
            rarity: rarities[2],
        }),
        magicItemCreate({
            item_name: "Ring of Invisibility",
            description:
                "This golden ring allows the wearer to become invisible for a limited amount of time.",
            category: categories[4],
            price: 1000,
            stock: 1,
            rarity: rarities[2],
        }),
        magicItemCreate({
            item_name: "Potion of Levitation",
            description:
                "This cloudy blue potion allows the drinker to levitate a few feet off the ground for a short period of time.",
            category: categories[2],
            price: 50,
            stock: 10,
            rarity: rarities[1],
        }),
        magicItemCreate({
            item_name: "Cloak of Elvenkind",
            description:
                "This green cloak allows the wearer to move stealthily and remain hidden from enemies.",
            category: categories[1],
            price: 1500,
            stock: 1,
            rarity: rarities[2],
        }),
        magicItemCreate({
            item_name: "Amulet of Fire Resistance",
            description:
                "This silver amulet provides resistance to fire damage.",
            category: categories[4],
            price: 750,
            stock: 5,
            rarity: rarities[1],
        }),
    ]);
}

async function createOrderInstances() {
    console.log("Adding order instances");
    await Promise.all([
        orderInstanceCreate([{ magic_item: magicItems[0], order_quantity: 2 }]),
        orderInstanceCreate([
            { magic_item: magicItems[1], order_quantity: 3 },
            { magic_item: magicItems[2], order_quantity: 4 },
        ]),
        orderInstanceCreate([
            { magic_item: magicItems[3], order_quantity: 1 },
            { magic_item: magicItems[2], order_quantity: 2 },
            { magic_item: magicItems[0], order_quantity: 3 },
        ]),
    ]);
}
