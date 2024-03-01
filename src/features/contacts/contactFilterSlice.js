import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config";


export const fetchFilteredContacts = createAsyncThunk(
    'contacts/filteredContacts',
    async({contactType,contactName})=>{
        const url = contactName ? `contacts/all?type=${contactType}&name=${contactName}` : `contacts/all?type=${contactType}`
        try{
            const response = await Axios.get(`${BASE_URL}/${url}`,
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

const filteredContactsSlice = createSlice({
    name: "filteredContact",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {
        resetFilteredContacts: (state)=>{
            state.loading = false
            state.data = []
            state.error = null
            return state
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchFilteredContacts.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchFilteredContacts.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchFilteredContacts.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})

export const {
    resetFilteredContacts
} = filteredContactsSlice.actions

export default filteredContactsSlice.reducer