import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentPageNo: 1
}

const currentPageSlice = createSlice({
    name: 'page',
    initialState: initialState,
    reducers: {
        setCurrentPage: (state,action)=>{
            state.currentPageNo = action.payload - 1
            return state
        }
    }
})

export const {
    setCurrentPage
} = currentPageSlice.actions

export default currentPageSlice.reducer