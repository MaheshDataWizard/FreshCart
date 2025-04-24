import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >
            {/* Item Info */}
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="space-y-1">
                {order.items?.map((item, index) => (
                  <p key={index} className="font-medium">
                    {item.product.name}{" "}
                    <span className="text-primary">x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address Info */}
            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p>
                {order.address.state}, {order.address.zipcode}, {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* Amount */}
            <p className="font-medium text-lg text-right my-auto whitespace-nowrap">
              {currency} {order.amount}
            </p>

            {/* Order Info */}
            <div className="flex flex-col text-sm text-right whitespace-nowrap">
              <p><span className="font-medium">Method:</span> {order.paymentType}</p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.isPaid ? "Paid" : "Pending"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
