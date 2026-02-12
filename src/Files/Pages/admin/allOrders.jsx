import React, { useEffect } from "react";
import { Layout } from "./Adminlayout";
import { Constants } from "../../api/env";

export default function AllOrders() {
  const [allOrders, setAllOrders] = React.useState([]);

  /* ================= LOAD ================= */
  const load = async () => {
    const p = await fetch(`${Constants.base}/api/orders.php`).then((r) =>
      r.json(),
    );
    setAllOrders(p);
    console.log(p);
  };

  useEffect(() => {
    load();
  }, []);

  const totalAmount = allOrders.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  console.log(totalAmount);

  return (
    <Layout>
      <div className="flex flex-col ">
        <h1>All Orders</h1>
        {allOrders.length}
        <h2>Total amount:- {totalAmount}</h2>
        {allOrders.map((order) => (
          <div
            key={order._id}
            className="border p-2 mb-1 flex justify-between items-start gap-2"
          >
            <h2>Order ID: {order._id}</h2>
            <p>Amount: {order.amount}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <div className="flex gap-2">
              {order.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`${photo}`}
                  alt={`Order ${order.id} Photo ${index + 1}`}
                  className="w-15 h-15 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
