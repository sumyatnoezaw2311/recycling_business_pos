import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from '../../component/utils/ShowToast'


export const fetchSingleSaleOrPur = createAsyncThunk(
    'salesOrPurchases/singleSaleOrPur',
    async({saleOrPurchase,id})=>{
        try{
            const response = await Axios.get(`${BASE_URL}/${saleOrPurchase}/${id}`,
                {
                    headers: HEADERS()
                }
            )
            return response.data
        }catch(error){
            if(error.response.status === 401){
                ShowToast('error','ကျေးဇူးပြု၍လော့အင်ပြန်ဝင်ပါ')
                localStorage.removeItem('recycleAppAuth')
            }else{
                ShowToast('error','မှားယွင်းနေပါသည်')
            }
            throw new Error(error)
        }
    }
)

const singleSaleOrPurSlice = createSlice({
    name: "singleSaleOrPur",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSingleSaleOrPur.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchSingleSaleOrPur.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchSingleSaleOrPur.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default singleSaleOrPurSlice.reducer