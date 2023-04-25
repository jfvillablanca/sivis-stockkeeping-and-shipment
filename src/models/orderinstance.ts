import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const SingleOrderSchema = new mongoose.Schema({
    magic_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MagicItem",
        required: true,
    },
    order_quantity: { type: Number, required: true },
});

const OrderInstanceSchema = new mongoose.Schema({
    orderArray: [SingleOrderSchema],
});

OrderInstanceSchema.virtual("url").get(function () {
    return `/order-instance/${this._id}`;
});

OrderInstanceSchema.plugin(mongooseLeanVirtuals);

// Export model
const OrderInstance = mongoose.model("OrderInstance", OrderInstanceSchema);
export default OrderInstance;
