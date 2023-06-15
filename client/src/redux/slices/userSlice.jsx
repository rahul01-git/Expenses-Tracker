import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        populateData: (state,payload)=> {
            state.user = payload
        },
        unPopulateData: (state)=>{
            state.user = {}
        }
    }
})

export const { populateData, unPopulateData} = userSlice.actions

export default userSlice.reducer