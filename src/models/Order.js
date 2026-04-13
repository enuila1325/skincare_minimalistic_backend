import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: Number,
                price: Number,
                selectedImage: String,
                variantIndex: Number,
            },
        ],

        total: Number,

        paymentMethod: {
            type: String,
            enum: ["transfer", "cash"],
            required: true,
        },

        proofImage: String,

        status: {
            type: String,
            enum: [
                "pending_payment",
                "pending_review",
                "confirmed",
                "delivered",
                "cancelled",
            ],
            default: "pending_payment",
        },

        customerName: String,
        phone: String,
        address: String,
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);