//@ts-nocheck
import { Request } from "express"
import { Response } from "express"
import { PrismaClient } from "@prisma/client"

const  prisma = new PrismaClient();



export const getOrders = async (req: Request, res: Response) => {
  // Extracting query parameters
  const { page, limit, totalCount } = req.query;

  // Default values if no query parameters are provided
  const pageNumber = parseInt(page as string, 10) || 1; // Default to page 1
  const limitNumber = parseInt(limit as string, 10) || 10; // Default to 10 items per page

  // Calculating the number of items to skip
  const skip = (pageNumber - 1) * limitNumber;

  try {
    // Fetching the total count of orders if requested
    let count = 0;
    if (totalCount !== '0') {
      count = await prisma.Orders.count();
    }

    // Fetching orders with pagination
    const orders = await prisma.Orders.findMany({
      skip,
      take: limitNumber,
      orderBy: { id: "desc" }, // Sorting by descending order
    });

    // Sending the response with status 200 and orders data
    res.status(200).json({ 
      orders, 
      currentPage: pageNumber, 
      totalPages: Math.ceil(count / limitNumber),
      totalCount: count
    });
  } catch (err) {
    console.log("Error while fetching orders", err);
    // Sending a response with status 500 in case of an internal server error
    res.status(500).json({ message: "Internal server error" });
  }
};
