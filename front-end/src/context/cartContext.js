import React, { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === productApi._id);
            if (existingItem) {
                return prevItems.map(item => {
                    item._id === productApi._id
                    ? { ...item, quantity: item.quantity + 1 } //...item: copy toàn bộ thuộc tính cũ (gồm name, price, v.v.)
                    : item
                });
            }
                //Thêm sản phẩm mới vào giỏ hàng
                return [...prevItems, { ...item, quantity: 1}];
        });
    };
    // (Thêm các hàm: removeFromCart, updateQuantity, clearCart...)

    return (
        <CartContext.Provider value = {{ cartItems, addToCart }} >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);