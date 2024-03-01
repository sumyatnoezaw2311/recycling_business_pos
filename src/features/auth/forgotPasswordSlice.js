import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL, HEADERS } from '../../config/config'
// import { ShowToast } from "../../components/utils/ShowToast";


export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/auth/forgot-password`,
                email,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const data = response.data
            // ShowToast('success','Password has been sent to your email')
            return data
        }catch(error){
            // if(error.response.status === 401){
            //     ShowToast('error',error.response.data.response.message)
            // }else{
            //     ShowToast('error','Something went wrong')
            // }
            throw new Error(error)
        }
    }
)


const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(forgotPassword.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(forgotPassword.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(forgotPassword.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default forgotPasswordSlice.reducer