import mongoose, { Document } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

interface CategoryInterface extends Document {
    name: string;
    url: string;
}

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
    return `/category/${this._id}`;
});

CategorySchema.plugin(mongooseLeanVirtuals);

// Export model
const Category = mongoose.model<CategoryInterface>("Category", CategorySchema);
export default Category;
