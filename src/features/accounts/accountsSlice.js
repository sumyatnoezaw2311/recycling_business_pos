import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const fetchUsers = createAsyncThunk(
    'accounts/users',
    async()=>{
        try{
            const response = await Axios.get(`${BASE_URL}/users`,
                {
                    headers: HEADERS()
                }
            )
            return response.data
        }catch(error){
            throw new Error(error)
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchUsers.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchUsers.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchUsers.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default usersSlice.reducer