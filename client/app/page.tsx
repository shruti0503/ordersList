'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;


  const fetchOrders = async (page:Number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4001/orders/get-orders`, {
        params: {
          page,
          limit: itemsPerPage,
        },
      });
      setOrders(response.data.orders);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page:any) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="orders-list h-screen w-full px-10 gap-5 flex flex-col items-center bg-gray-50 text-black p-4">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      {loading ? (
        <></>
        // <Spinner className="text-center" />
      ) : (
        <>
        <div className='flex border rounded-t-3xl w-full flex-col'>
          <Table className="w-full mb-4 border rounded-t-3xl">
              <TableHeader className='bg-green-200  rounded-t-3xl'>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: any) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
          <div className="pagination flex justify-between items-center w-full">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              className="mr-2"
            >
              Previous
            </Button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              className="ml-2"
            >
              Next
            </Button>
          </div>

        </div>
         
        </>
      )}
    </div>
  );
};

export default OrdersList;