import { createContext, useContext, useReducer, useState } from "react";
import {initCartState,cartReducer} from "./reducer";
const CartContext = createContext();

function CartProvider({children}) {
    const [cartState,cartDispatch] = useReducer(cartReducer,initCartState);
    

    const increment = (id) => {
        return cartDispatch({
          type: "INCREMENT",
          payload: id,
        });
      };
    
    const decrement =(id) => {
        return cartDispatch({
            type: "DECREMENT",
            payload: id
        });
    }

    const removeProduct= (id,qty,price) => {
        return cartDispatch({
            type: "REMOVEPRODUCT",
            payload: {id,qty,price}
        });
    }
    
    return (
        <CartContext.Provider value={{cartState,cartDispatch,removeProduct,decrement,increment}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const CartState = () => {
    return useContext(CartContext);
}