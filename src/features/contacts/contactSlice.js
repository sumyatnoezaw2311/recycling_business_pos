import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import Axios from 'axios'
import { BASE_URL,HEADERS } from "../../config/config"

export const fetchContact = createAsyncThunk(
    'contacts/fetchContact',
    async (contactId)=>{
        try{
            const response = await Axios.get(
                `${BASE_URL}/contacts/${contactId}`,
                {
                    headers: HEADERS()
                }
            )
            const data = response.data.data
            return data
        }catch(error){
            throw new Error(error)
        }
    }
)

const contactSlice = createSlice({
    name: 'contact',
    initialState:{
        loading: false,
        data: [],
        error: null
    },
    reducers: {
        resetSingleContact : (state)=>{
            state.loading = false
            state.data = []
            state.error = null
            return state
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchContact.pending, (state)=>{
            state.loading = true
            state.data = []
            state.error = null
            return state
        })
        .addCase(fetchContact.fulfilled, (state,action)=>{
            state.loading = false
            state.data = action.payload
            state.error = null
            return state
        })
        .addCase(fetchContact.rejected, (state,action)=>{
            state.loading = false
            state.data = []
            state.error = action.error
            return state
        })
    }
})

export const { resetSingleContact } = contactSlice.actions

export default contactSlice.reducer