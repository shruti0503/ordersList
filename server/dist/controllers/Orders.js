"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, totalCount } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    try {
        let count = 0;
        if (totalCount !== '0') {
            count = yield prisma.Orders.count();
        }
        const orders = yield prisma.Orders.findMany({
            skip,
            take: limitNumber,
            orderBy: { id: "desc" },
        });
        res.status(200).json({
            orders,
            currentPage: pageNumber,
            totalPages: Math.ceil(count / limitNumber),
            totalCount: count
        });
    }
    catch (err) {
        console.log("Error while fetching orders", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOrders = getOrders;
