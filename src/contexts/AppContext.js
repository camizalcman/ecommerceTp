'use client'
import { useState, useContext, createContext } from "react";

const AppContext = createContext(); 

//va a englobar toda la aplicacion
export const AppContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [activeUser, setActiveUser] = useState(null);

    //Funciones del carrito
    const removeFromCart = (cartItemId) => {
        setCart(cart.filter(item => item.cartItemId !== cartItemId))
    }
   
    //Recorre el carrito con map. Si encuentra el item con ese cartItemId, le cambia la cantidad y recalcula el subtotal. Si no es ese item, lo deja igual.
    const updateQuantity = (cartItemId, newQuantity) => {
        setCart(cart.map(item =>
            item.cartItemId === cartItemId
                ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
                : item
        ));
    };

    const addToCart = (product, customizations, quantity) => {
    const cartItemId = `${product._id}-${JSON.stringify(customizations)}`;
    const exists = cart.find(item => item.cartItemId === cartItemId);
    const unitPrice = customizations.size?.price || 0;

    if (exists) {
            updateQuantity(cartItemId, exists.quantity + quantity);
        } else {
            const cartItem = {
                _id: product._id,
                name: product.name,
                image: product.image,
                price: unitPrice,
                quantity: quantity,
                customizations: customizations,
                subtotal: unitPrice * quantity,
                cartItemId: cartItemId,
            };
            setCart([...cart, cartItem]);
        }
    };
    
    const clearCart = () => setCart([]);

    const cartTotal = () => cart.reduce((acc, item) => acc + item.subtotal, 0);

    const cartQty = () => cart.reduce((acc, item) => acc + item.quantity, 0);


    //Funciones de favorites
    const addFavorite = (data) => {
        setFavorites([...favorites, data])
    }

    const removeFavorite = (productId) => {
        setFavorites(favorites.filter(fav => fav._id !== productId))
    }

    const isFavorite = (productId) => {
        return favorites.some(fav => fav._id === productId)
    }

    const favoritesQty = () => favorites.length

    //Funciones de user
    const login = (userData) => setActiveUser(userData)

    const logout = () => {
        setActiveUser(null)
        setFavorites([])
    }

    

    return (
        //va a exportar un componente que se llama app context y utiliza el metodo provider
        //value son las cosas que queres dejar publicas y exportar
        <AppContext.Provider value={{favorites, setFavorites, favoritesQty, addFavorite, removeFavorite, isFavorite,
    cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartQty,
    activeUser, login, logout }}>
            {children}
        </AppContext.Provider>
    )
}

//el hook
export const useAppContext = () => {
    const context = useContext(AppContext);

    //el context no se puede usar por fuera del provider
    //si no hay context tirame un error
    if (!context){
        throw new Error ('useAppContext solo puede ser usado dentro del provider')
    }

    return context
}

export default AppContext