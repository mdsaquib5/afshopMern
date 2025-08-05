import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=> {
    const navigate = useNavigate();

    const currency = import.meta.env.VITE_CURRENCY;

    const [user, setUser] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }


    // fetch User Auth Status, user Data & CartItems
    const fetchUser = async () => {
        try {
            console.log('Fetching user auth status...');
            const { data } = await axios.get('/api/user/is-auth');
            console.log('Auth response:', data);
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
                console.log('User authenticated successfully');
            } else {
                console.log('User not authenticated:', data.message);
                setUser(null);
            }
        } catch (error) {
            console.log('Auth error:', error.message);
            setUser(null);
        }
    }

    // fetch all products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // add product to cart

    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        toast.success('Add to Cart');
    }

    // update cart items quantity
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart Updated');
    }

    // remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success('Remove from Cart');
        setCartItems(cartData);
    }

    // Get Cart Cart items count
    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }
    // get cart total amount
    const getCartAmount = ()=> {
        let totalCount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items)
            if (cartItems[items] > 0) {
                totalCount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalCount * 100) / 100;
    }
    

    useEffect(() => {
        fetchSeller()
        fetchProducts()
        fetchUser()
    }, []);


    // Update Database Cart items
    useEffect(() => {
        const updateCart = async () => {
            try {
                const {data} = await axios.post('/api/cart/update', {cartItems});
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (user) {
            updateCart();
        }
    }, [cartItems])
    

    const value = {navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItems, removeFromCart, cartItems, setSearchQuery, searchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=> {
    return useContext(AppContext);
}