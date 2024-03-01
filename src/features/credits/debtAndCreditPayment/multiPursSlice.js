import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ids: [],
    total: 0
}

const multiPursSlice = createSlice({
    name: 'multiPurchases',
    initialState: initialState,
    reducers: {
        setMultiPurs: (state,action)=>{
            state.ids = action.payload
            return state
        },
        setTotal: (state,action)=>{
            state.total = action.payload
            return state
        },
        resetMultiPurs: (state)=>{
            state.ids = []
            return state
        }
    }
})

export const {
    setMultiPurs,
    setTotal,
    resetMultiPurs
} = multiPursSlice.actions

export default multiPursSlice.reducer