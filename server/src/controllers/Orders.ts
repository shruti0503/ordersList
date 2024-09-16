
import { Request } from "express"
import { Response } from "express"
import { PrismaClient } from "@prisma/client"

const  prisma = new PrismaClient();

export const getOrders = async (req: Request, res: Response) => {
  
  const { page, limit, totalCount } = req.query;


  const pageNumber = parseInt(page as string, 10) || 1; 
  const limitNumber = parseInt(limit as string, 10) || 10; 

  
  const skip = (pageNumber - 1) * limitNumber;

  try {
    
    let count = 0;
    if (totalCount !== '0') {
      count = await prisma.orders.count();
    }

   
    const orders = await prisma.orders.findMany({
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
  } catch (err) {
    console.log("Error while fetching orders", err);
    
    res.status(500).json({ message: "Internal server error" });
  }
};
