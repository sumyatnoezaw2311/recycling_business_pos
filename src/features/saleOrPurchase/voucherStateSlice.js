import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact: null,
    payment: null,
    items: []
}

const voucherStateSlice = createSlice({
    name: "voucherState",
    initialState: initialState,
    reducers: {
        setItems: (state,action)=>{
            state.items = action.payload
            return state
        },
        setContact: (state,action)=>{
            state.contact = action.payload
            return state
        },
        setPayment: (state,action)=>{
            state.payment = action.payload
            return state
        },
        // getItem: (state,action)=>{
        //     const singleItem = state.items.find(item=> item.id === action.payload)
        //     return singleItem
        // },
        replaceItem: (state,action)=>{
            const newItemsArr = state.items.map((item)=>
                item.id === action.payload.id ? action.payload : item
            )
            state.items = newItemsArr
            return state
        }
    }
})

export const {
    setItems,
    setContact,
    setPayment,
    replaceItem
} = voucherStateSlice.actions


export default voucherStateSlice.reducer