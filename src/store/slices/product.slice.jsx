import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';


export const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProduct : (state, action) => { {/* state guarda el valor actual de nuestro slice  y el action, siempre deben colocarse las dos opciones */ }
            return action.payload
        }
    }
})

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;


//redux thunk / middlewares
// Se ejecutan entre el dispatch y la accion
/*
export const myFunctionThunk = () => dispatch => {
   // tareas a realizar
   dispatch( actionName1() )
   //mas tareas 
   dispatch( actionName2() )

}
*/

export const getProductThunk = () => dispatch => {
    dispatch ( setIsLoading(true))                                      

    axios
    .get("https://e-commerce-api-v2.academlo.tech/api/v1/products")     
    .then(resp => {
        dispatch(setProduct(resp.data))
    })
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

 {/* primero se hace que funcione el loader, 
segundo se realiza la peticion a la API con GET, 
tercero en caso de que la peticion sea atisfactoria que debe hacer con el THEN,  
cuarto en caso que la peticion no sea satisfactoria debe reportar el error
quinto finalmente cuando ya se haya cumplido los pasos anterior y estos sean satisfactorios o no el loader debe terminar con el FINALLY */}
export const filterCategoryThunk = id => dispatch => {
    dispatch (setIsLoading(true))
    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)     
    .then(resp => dispatch(setProduct(resp.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const filterImputDateThunk =  value => dispatch=>{
    dispatch (setIsLoading(true))
    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${value}`)     
    .then(resp => dispatch(setProduct(resp.data)))
    .catch(error => console.error(error))
    .finally(() => dispatch(setIsLoading(false)))
}
