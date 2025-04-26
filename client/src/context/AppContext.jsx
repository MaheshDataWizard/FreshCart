import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Creating a context for global state management
export const AppContext = createContext();

// AppContextProvider wraps the entire app to share state globally
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY; // Fetch currency from env
  const navigate = useNavigate();

  // State variables
  const [user, setUser] = useState(null); // Logged-in user
  const [isSeller, setIsSeller] = useState(false); // User role: buyer or seller
  const [showUserLogin, setShowUserLogin] = useState(false); // Login modal visibility
  const [products, setProducts] = useState([]); // List of all products
  const [cartItems, setCartItems] = useState({}); // Cart: key = product ID, value = quantity
  const [searchQuery, setSearchQuery] = useState({});

  //Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  // FEtch user auth status, User Data and Cart Items

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error) {
      setUser(null);
    }
  };
  // 📦 Fetch all products (currently from dummy data)
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
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

  //Get Cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  //Get Cart Total Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // 🔁 Fetch products when component mounts
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // Update database cart item
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

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
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};
