import express from "express";
import {
    createOrder,
    uploadProof,
    getOrders
} from "../controllers/orderController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/:id/proof", upload.single("proof"), uploadProof);
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus);

export default router;