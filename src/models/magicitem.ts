import mongoose, { Schema } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

interface MagicItemInterface extends Document {
    item_name: string;
    description: string;
    category: Schema.Types.ObjectId;
    price: number;
    stock: number;
    rarity: "Common" | "Uncommon" | "Rare" | "Very rare" | "Legendary";
    url: string;
}

export const MagicItemSchema = new mongoose.Schema({
    item_name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true, maxLength: 1000 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    rarity: {
        type: String,
        enum: ["Common", "Uncommon", "Rare", "Very rare", "Legendary"],
        required: true,
    },
});

MagicItemSchema.virtual("url").get(function () {
    return `/magic-item/${this._id}`;
});

MagicItemSchema.plugin(mongooseLeanVirtuals);

// Export model
const MagicItem = mongoose.model<MagicItemInterface>(
    "MagicItem",
    MagicItemSchema
);
export default MagicItem;
