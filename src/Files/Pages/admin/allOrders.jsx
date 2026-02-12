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
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1>All Orders</h1>
        {allOrders.map((order) => (
          <div key={order._id} className="border p-4 mb-4">
            <h2>Order ID: {order._id}</h2>
            <p>Amount: {order.amount}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <h3>Photos:</h3>
            <div className="flex gap-2">
              {order.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`${photo}`}
                  alt={`Order ${order.id} Photo ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
