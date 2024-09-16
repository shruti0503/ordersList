import express from "express"
import { Router } from "express"
const router =Router();
import { getOrders } from "../controllers/Orders";

router.get("/get-orders",getOrders )

export default router;