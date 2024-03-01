import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const fetchSaleOrPurchaseTotal = createAsyncThunk(
    'salesOrPurchases/saleOrPurchaseTotal',
    async({saleOrPurchase,startDate,endDate,inCharge,person,pageNo})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${person && (saleOrPurchase === "sales" ? `customer=${person}`: `merchant=${person}`) }
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}
        &${pageNo && `page=${pageNo}`}`;
        try{
            const response = await Axios.get(`${BASE_URL}/${saleOrPurchase}/total${urlParam}`,
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

const fetchSaleOrPurchaseTotalSlice = createSlice({
    name: "saleOrPurchaseTotal",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSaleOrPurchaseTotal.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchSaleOrPurchaseTotal.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchSaleOrPurchaseTotal.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default fetchSaleOrPurchaseTotalSlice.reducer