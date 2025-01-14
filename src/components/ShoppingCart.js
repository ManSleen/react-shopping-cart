import React, { useContext } from "react";
import { CartContext } from "../contexts";

// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = () => {
  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  const { cart, removeItem } = useContext(CartContext);
  return (
    <div className="shopping-cart">
      {cart ? (
        cart.map(item => (
          <Item removeItem={removeItem} key={item.id} {...item} />
        ))
      ) : (
        <div>Loading</div>
      )}

      <div className="shopping-cart__checkout">
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
