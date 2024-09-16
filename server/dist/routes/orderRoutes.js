"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Orders_1 = require("../controllers/Orders");
router.get("/get-orders", Orders_1.getOrders);
exports.default = router;
