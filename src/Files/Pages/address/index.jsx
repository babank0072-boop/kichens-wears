"use client";
import React, { useEffect, useState } from "react";

import { useOrder } from "../../Context/OrderContext";
import { useConfirmedOrders } from "../../Context/ConfimedorderContext";
import { useCart } from "../../Context/CartContext";
import CartHeader from "../../Components/cartHeader";
import PriceDetails from "../../Components/cart_price";
import PlaceBtn from "../../Components/place-btn";
import FloatingInput from "../../Components/input";
// import PriceDetails from "../../Components/cartPrice-Details";

const errorMsg = (Lable) => {
  return <p className="text-md text-[red]">{Lable} is missing!</p>;
};

const AddressPage = () => {
  const { orders, clearOrders } = useOrder();
  const { clearCart, cart, updateCart, address, setAddress } = useCart();

  console.log(cart, "llllllllllll", address);

  const [totalPrice, setTotalPrice] = useState();
  const { addConfirmedOrder } = useConfirmedOrders();
  const [addPayload, setAddPayload] = useState({
    name: "",
    mobile: "",
    pin: "",
    address: "",

    add1: "",
  });
  console.log(orders, cart, "poasdijsiojcsd", addPayload);

  const [submitted, setSubmitted] = useState(false);
  const allFilled = Object.values(addPayload).every((value) => value !== "");
  const currentOrder = orders[0];
  const totalAmount = currentOrder?.totalAmount;
  const toDis = orders.reduce(
    (sum, item) => sum + item?.totalAmount?.totalDis,
    0
  );
  const totalMRP = orders.reduce(
    (sum, item) => sum + item?.totalAmount?.totalMRP,
    0
  );
  const totalSell = orders.reduce(
    (sum, item) => sum + item?.totalAmount?.totalSell,
    0
  );

  const priceOObj = {
    totalDis: toDis,
    totalMRP: totalMRP,
    totalSell: totalSell,
  };
  console.log(priceOObj);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTypeSelect = (type) => {
    setAddPayload((prev) => ({
      ...prev,
      addtype: type,
    }));
  };

  const showError = (key, Lable) => {
    return submitted ? (addPayload[key] ? "" : errorMsg(Lable)) : "";
  };

  useEffect(() => {
    if (cart.length) {
      const totalMRP = cart.reduce(
        (sum, item) => sum + item.priceObj.mrp * item.quantity,
        0
      );
      const totalSell = cart.reduce(
        (sum, item) => sum + item.priceObj.selling_price * item.quantity,
        0
      );

      const totalDis = totalMRP - totalSell;
      const totalObj = {
        totalDis,
        totalMRP,
        totalSell,
      };

      setTotalPrice(totalObj);
    }
  }, [cart]);

  const placeOrder = () => {
    const newOrder = {
      id: uuidv4(),
      items: cart,
      total: 1200,
      status: "Pending",
      date: new Date().toISOString(),
      totalAmount: {
        ...totalPrice,
      },
      address: {},
      payment: "Pending",
    };

    addOrder(newOrder);
  };

  return (
    <>
      <div className=" pb-[60px] h-full relative bg-[#fff]">
        <CartHeader green={0} />
        <div className="monts grid min-h-[72px] grid-cols-1 place-content-between gap-6 px-4 md:mx-14 md:grid-cols-3">
          <div className="bg-[#fff] pt-8 rounded-xl ">
            <div className="bg-transparent  w-full ">
              {/* <div className="text-[16px] font-medium capitalize mb-4 !leading-[16.8px] tracking-wide text-neutral-900">
                Please Enter Address
              </div> */}
              {/* NAME */}
              <div className="flex flex-col gap-6">
                {/* Enter Name */}
                <div>
                  <FloatingInput
                    onChange={handleChange}
                    label="Full Name"
                    name="name"
                  />
                  {showError("name", "Name")}
                </div>

                {/* MOBILE NUMBER */}
                <div>
                  <FloatingInput
                    onChange={handleChange}
                    label="Mobile No."
                    name="mobile"
                    type="number"
                  />
                  {showError("mobile", "Mobile")}
                </div>

                {/* PIN CODE */}

                <div>
                  <FloatingInput
                    onChange={handleChange}
                    label="Pin-code"
                    name="pin"
                    type="number"
                    maxLength={6}
                  />
                  {showError("pin", "Pin-Code")}
                </div>

                {/* CITY + STATE */}
                <div className="bg-transparent flex gap-6 xs:flex-col">
                  <div>
                    <FloatingInput
                      onChange={handleChange}
                      label="City"
                      name="city"
                    />
                    {showError("city", "City")}
                  </div>
                  <div>
                    <FloatingInput
                      onChange={handleChange}
                      label="State"
                      name="state"
                    />
                    {showError("state", "State")}
                  </div>
                </div>
                {/* ADDRESS 1 */}
                <div>
                  <FloatingInput
                    onChange={handleChange}
                    label="House No, Building Name"
                    name="add1"
                  />
                  {showError("add1", "Address")}
                </div>
                {/* ADDRESS 2 */}
                <div>
                  <FloatingInput
                    onChange={handleChange}
                    label="Road name, Area,Colony"
                    name="address"
                  />
                  {showError("address", "Address")}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PRICE BOX */}
          <div>
            {/* <PriceDetails
              priceArray={priceArray}
              totalPrice={totalAmount.totalSell}
              totalDis={totalAmount.totalDis}
            /> */}
            {/* <PriceDetails
              totalPrice={priceOObj}
              onClick={() => {
                setSubmitted(true);

                if (allFilled) {
                  for (let index = 0; index < orders.length; index++) {
                    const element = orders[index];
                    addConfirmedOrder({
                      id: element.id, // which order to update
                      status: "Pending",
                      payment: "Pending", // new data you want to update
                      address: { ...addPayload },
                      orderDetails: { ...element },
                    });
                  }

                  window.location.href = "/cart/payment";
                } else {
                  console.log("is All Ok NOOOOOOOOO");
                }
              }}
            /> */}
          </div>
        </div>
        {/* <div>
          <PriceDetails
            priceArray={priceArray}
            totalPrice={totalAmount.totalSell}
            totalDis={totalAmount.totalDis}
            containerClassname={"!bg-[#fff] !mx-4 !mb-8 shadow rounded !m-4"}
          />
        </div> */}
        <PlaceBtn
          onClick={() => {
            setSubmitted(true);
            console.log("sdfoihjdfiovjdfiojviodfj");

            if (allFilled) {
              setAddress({
                ...addPayload,
              });

              window.location.href = "/cart";
            } else {
              console.log("is All Ok NOOOOOOOOO");
            }
          }}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
};

export default AddressPage;
