import React from "react";
import ProgressBar from "./process";

const CartHeader = ({ green }) => {
  const headermenus = [
    {
      name: "Bag",
      href: "/cart",
    },
    {
      name: "Address",
      href: "/cart/address",
    },

    {
      name: "payment",
      href: "/cart/payment",
    },
  ];

  return (
    <>
      <header className="h-[60px] md:h-[120px] mb-4">
        <div className="bg-[#fff] flex justify-center items-cemter py-3">
          <div className="w-[360px]">
            {green == 0 ? (
              <img src="/process1.svg" />
            ) : green == 1 ? (
              <img src="/process2.png" />
            ) : (
              <img src="/process3.svg" />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default CartHeader;
