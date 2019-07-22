import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { ProductContext, CartContext } from "./contexts";
// import { useLocalStorage } from "./hooks/useLocalStorage";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(() => {
    const cartItem = JSON.parse(localStorage.getItem("cart"));
    if (cartItem) {
      return cartItem;
    } else {
      return [];
    }
  });
  // const [storedValue, setValue] = useLocalStorage("cart");

  const addItem = item => {
    setCart([...cart, item]);
  };

  const removeItem = id => {
    let newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
