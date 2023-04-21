import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
});

CustomerSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
});

CustomerSchema.virtual("url").get(function () {
    return `/customer/${this._id}`;
});

// Export model
const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
