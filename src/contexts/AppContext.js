'use client'
import { useState, useContext, createContext } from "react";

// Creación del contexto global de la aplicación
const AppContext = createContext(); 

//va a englobar toda la aplicacion y expone el estado global
export const AppContextProvider = ({children}) => {

    //Se presentan los estados
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

    //Recibe el product, customizaciones y cantidad
    const addToCart = (product, customizations, quantity) => {

        //Se crea un ID compuesto, definido por id de producto mas customizaciones
        const cartItemId = `${product._id}-${JSON.stringify(customizations)}`;
        //busca si ya existe en el carrito
        const exists = cart.find(item => item.cartItemId === cartItemId);
        //Toma el precio según el tamaño elegido, si no existe es 0
        const unitPrice = customizations.size?.price || 0;

        
        if (exists) {
                //Si ya existe el producto, en vez de duplicarlo suma cantidad
                updateQuantity(cartItemId, exists.quantity + quantity);
            } else {
                //Si ya existe el producto, crea un nuevo item en el carrito
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

    //reduce recorre el array y va acumulando los subtotales.
    const cartTotal = () => cart.reduce((acc, item) => acc + item.subtotal, 0);

    //reduce recorre el array y va acumulando las cantidades.
    const cartQty = () => cart.reduce((acc, item) => acc + item.quantity, 0);

    //para abrir y cerrar el carrito
    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);


    //Funciones de favorites

    //agrega un producto a favoritos. (...favoritos copia lo que ya tenía)
    const addFavorite = (data) => {
        setFavorites([...favorites, data])
    }

    //para eliminar, se queda con los que no coinciden con el producto indicado
    const removeFavorite = (productId) => {
        setFavorites(favorites.filter(fav => fav._id !== productId))
    }

    //verifica si el producto está en favoritos, .some devuelve true o false
    const isFavorite = (productId) => {
        return favorites.some(fav => fav._id === productId)
    }

    const favoritesQty = () => favorites.length

    //Funciones de user
    //guarda el usuario logueado
    const login = (userData) => setActiveUser(userData)

    //cierra la sesión y limpia los favoritos
    const logout = () => {
        setActiveUser(null)
        setFavorites([])
    }

    

    return (
        //va a exportar un componente que se llama app context y utiliza el metodo provider
        //value son las cosas que queres dejar publicas y exportar
        <AppContext.Provider value={{favorites, setFavorites, favoritesQty, addFavorite, removeFavorite, isFavorite,
    cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartQty, isCartOpen, openCart, closeCart,
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