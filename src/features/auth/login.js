import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL } from "../../config/config";
import { ShowToast } from '../../component/utils/ShowToast'


export const userLogin = createAsyncThunk(
    "auth/login",
    async (loginData)=>{
        try{
            const response = await Axios.post(
                `${BASE_URL}/auth/login`,
                {
                  email: loginData.email,
                  password: loginData.password,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
            const data = response.data
            const authData = {
                'token': data.access_token,
                'loginTime': Math.floor(Date.now()/1000),
                'role': data.user.is_admin,
                'name': data.user.name,
                'email': data.user.email, 
            }
            localStorage.setItem("recycleAppAuth",JSON.stringify(authData));
            ShowToast('success','Login အောင်မြင်ပါသည်')
            return data
        }catch(error){
            if(error.response.status === 401){
                ShowToast('error','အီးမေးလ်(သို့)Passwordမှားယွင်းနေပါသည်')
            }else{
                ShowToast('error','မှားယွင်းနေပါသည်')
            }
            throw new Error(error)
        }
    }
)


const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {
        logOut: (state)=>{
            state.loading = false;
            state.data = [];
            state.error = null
            localStorage.removeItem('recycleAppAuth')
            
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(userLogin.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(userLogin.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})

export const { logOut } = loginSlice.actions

export default loginSlice.reducer