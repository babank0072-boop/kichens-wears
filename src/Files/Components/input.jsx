import React from "react";

const FloatingInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
    
        placeholder=" "
        className="
          peer block w-full px-4 py-3.5 text-[16px] bg-transparent
          border border-gray-300 rounded-md
          focus:outline-none focus:border-blue-500
          placeholder-transparent
        "
        {...props}
      />

      <label
        className="
          absolute left-3 top-4 px-1 bg-white
          text-gray-500 transition-all duration-200
          pointer-events-none
          peer-placeholder-shown:top-4.5 
          peer-placeholder-shown:text-[14px]
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500
          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm
        "
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
