'use client'
import { useState, useContext, createContext } from "react";

const AppContext = createContext(); 

//va a englobar toda la aplicacion
export const AppContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [activeUser, setActiveUser] = useState(null);

    //Funciones del carrito
    //ME FALTA TERMINAR
    const removeFromCart = (cartItemId) => {
        setCart(cart.filter(item => item.cartItemId !== cartItemId))
    }

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

    const favoritosQty = () => favorites.length

    //Funciones de user
    const login = (userData) => setActiveUser(userData)

    const logout = () => {
        setActiveUser(null)
        setFavorites([])
    }

    

    return (
        //va a exportar un componente que se llama app context y utiliza el metodo provider
        //value son las cosas que queres dejar publicas y exportar
        <AppContext.Provider value={{ favoritos, setFavoritos, favoritosQty, handleAddFavorite}}>
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