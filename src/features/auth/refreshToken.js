import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from '../../config/config'

export const fetchRefreshedToken = createAsyncThunk(
    'auth/refreshedToken',
    async ()=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/auth/refresh`,
                null,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data  
            const authData = {
                'token': data.access_token,
                'loginTime': Math.floor(Date.now()/1000),
                'role': data.user.is_admin,
                'name': data.user.name,
                'email': data.user.email, 
            }
            localStorage.setItem("recycleAppAuth",JSON.stringify(authData));
            return data
        }catch(error){
            throw new Error(error)
        }
    }
)

const refreshedTokenSlice = createSlice({
    name: "refreshedToken",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchRefreshedToken.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchRefreshedToken.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchRefreshedToken.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
        })
    }
})

export default refreshedTokenSlice.reducer