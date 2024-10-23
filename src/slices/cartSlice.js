
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';

const initialState = {
    totalItems : localStorage.getItem("totalitem") ? localStorage.getItem("item") : 0 ,
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState ,
    reducers: {
        setTotalitems( state , value ) {
            state.totalItems = value.payload ;
        },
        // add 
        // remove 
        // rest 
    },

});

export const { setTotalitems } = cartSlice.actions ;
export default cartSlice.reducer ;