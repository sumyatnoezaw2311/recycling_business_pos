import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";
import { ShowToast } from "../../component/utils/ShowToast";

export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async ({startDate,endDate,inCharge,pageNo})=>{
        let urlParam = `?${inCharge && `in_charge=${inCharge}`}
        &${startDate && `start_date=${startDate}`}
        &${endDate && `end_date=${endDate}`}
        &${pageNo && `page=${pageNo}`}`;
        try{
            const response = await Axios.get(
                `${BASE_URL}/expenses${urlParam}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data
            return data
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


const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchExpenses.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchExpenses.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchExpenses.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})


export default expensesSlice.reducer