import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        enum: ["Weapon", "Armor", "Potion", "Scroll", "Wondrous Item"],
        required: true,
    },
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
    return `/category/${this._id}`;
});

CategorySchema.plugin(mongooseLeanVirtuals);

// Export model
const Category = mongoose.model("Category", CategorySchema);
export default Category;
