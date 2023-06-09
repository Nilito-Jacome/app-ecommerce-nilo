import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) => { {/* state guarda el valor actual de nuestro slice  y el action, siempre deben colocarse las dos opciones */ }
            return action.payload 
        }
    }
})

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", getConfig())     
        .then(resp => dispatch(setCart(resp.data)))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}


export const addToCartThunk = data => dispatch => {
    dispatch(setIsLoading(true))

    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data , getConfig())     
        .then(() => dispatch(getCartThunk()))
        .catch(error => alert("Ups algo salio mal"))
        .finally(() => dispatch(setIsLoading(false)))
}

export const updateRateThunk = (id, rate) => dispatch => {
    dispatch(setIsLoading(true))
    
    const body = {
       quantity : rate
    }
    axios
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, body, getConfig())     
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const deletedCartThunk = (id) => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())     
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

export const purchaseCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, getConfig())     
        .then(() => dispatch(getCartThunk()))
        .catch(error => console.error(error))
        .finally(() => dispatch(setIsLoading(false)))
}

