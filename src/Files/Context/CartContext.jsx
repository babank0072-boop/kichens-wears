'use client'
import React, { createContext, useContext, useReducer, useEffect } from "react";

// 1. Create Context
const CartContext = createContext();

// Load from localStorage
const loadCartStateFromStorage = () => {
  try {
    const data = localStorage.getItem("cartState");
    return data
      ? JSON.parse(data)
      : {
          cart: [],
          address: null,
        };
  } catch {
    return {
      cart: [],
      address: null,
    };
  }
};

// 2. Reducer
const cartReducer = (state, action) => {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existingItem = state.cart.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case "UPDATE_CART": {
      const { id, quantity } = action.payload;

      return {
        ...state,
        cart:
          quantity <= 0
            ? state.cart.filter(item => item.id !== id)
            : state.cart.map(item =>
                item.id === id ? { ...item, quantity } : item
              )
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: []
      };

    // ✅ ADDRESS ACTIONS
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload
      };

    case "CLEAR_ADDRESS":
      return {
        ...state,
        address: null
      };

    default:
      return state;
  }
};

// 3. Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    {},
    loadCartStateFromStorage
  );

  // Save both cart + address
  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  // Cart Actions
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const updateCart = (id, quantity) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { id, quantity }
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // ✅ Address Actions
  const setAddress = (addressData) => {
    dispatch({ type: "SET_ADDRESS", payload: addressData });
  };

  const clearAddress = () => {
    dispatch({ type: "CLEAR_ADDRESS" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        address: state.address,   // ✅ exposed here
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        setAddress,               // ✅ new
        clearAddress              // ✅ new
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 4. Hook
export const useCart = () => useContext(CartContext);
