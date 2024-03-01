import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from '../../component/utils/ShowToast'

export const fetchSalesOrPurchases = createAsyncThunk(
    'salesOrPurchases/fetchSalesOrPurchases',
    async({saleOrPurchase,startDate,endDate,inCharge,person,pageNo})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${person && (saleOrPurchase === "sales" ? `customer=${person}`: `merchant=${person}`) }
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}
        &${pageNo && `page=${pageNo}`}`;
        try{
            const response = await Axios.get(`${BASE_URL}/${saleOrPurchase}${urlParam}`,
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

const saleOrPurchaseSlice = createSlice({
    name: "salesOrPurchase",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSalesOrPurchases.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchSalesOrPurchases.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchSalesOrPurchases.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default saleOrPurchaseSlice.reducer