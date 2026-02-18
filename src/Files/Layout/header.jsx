import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex justify-between !p-1.5 !px-4 bg-[#2874f0]">
        <a href="/">
          <img
            src="/logo.webp"
            className="h-[40px]"
            title="Flipkart"
          />{" "}
        </a>
        <div className="flex justify-end gap-2">
         
          <img
            src="/cart-svg.svg"
            alt="Cart"
            className="_1XmrCc"
            width="28"
            height="28"
          />
        </div>
      </div>
    </>
  );
};
export default Header;
