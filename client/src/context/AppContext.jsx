import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

// Creating a context for global state management
export const AppContext = createContext();

// AppContextProvider wraps the entire app to share state globally
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY; // Fetch currency from env
  const navigate = useNavigate();

  // State variables
  const [user, setUser] = useState(null); // Logged-in user
  const [isSeller, setIsSeller] = useState(false); // User role: buyer or seller
  const [showUserLogin, setShowUserLogin] = useState(false); // Login modal visibility
  const [products, setProducts] = useState([]); // List of all products
  const [cartItems, setCartItems] = useState({}); // Cart: key = product ID, value = quantity

  // 📦 Fetch all products (currently from dummy data)
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // 🛒 Add product to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // 🔄 Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // ❌ Remove product from cart or decrease quantity
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // Remove item if quantity becomes 0
      }
    }

    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  // 🔁 Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🌍 Values provided to all consuming components
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
