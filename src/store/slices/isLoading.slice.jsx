import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading : (state, action) => { {/* state guarda el valor actual de nuestro slice  y el action, siempre deben colocarse las dos opciones */ }
            return action.payload 
        }
    }
})

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;

