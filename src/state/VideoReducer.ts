import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        length: 0, 
        currentLocation: 0,
        isDragging: false,
    },
    reducers: {
        setLength: (state, action) => {
            state.length = action.payload;
        },
    }
}) 

export const { setLength } = videoSlice.actions;
export default videoSlice.reducer;