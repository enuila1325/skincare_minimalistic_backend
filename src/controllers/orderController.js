import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
    try {
        const { items, paymentMethod, customerName, phone, address, notes } = req.body;

        const products = await Product.find({
            _id: { $in: items.map((i) => i.productId) },
        });

        let total = 0;

        const orderItems = items.map((item) => {
            const product = products.find((p) => p._id.toString() === item.productId);

            const subtotal = product.price * item.quantity;
            total += subtotal;

            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price,
            };
        });

        const status = paymentMethod === "transfer" ? "pending_payment" : "confirmed";

        const order = await Order.create({
            items: orderItems,
            total,
            paymentMethod,
            status,
            customerName,
            phone,
            address,
            notes,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const uploadProof = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Orden no encontrada" });

        order.proofImage = req.file.path;
        order.status = "pending_review";

        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate("items.product");
    res.json(orders);
};