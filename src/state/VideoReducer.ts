import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        length: 1, 
        currentLocation: 0,
        isDragging: false,
        isPlaying: false,
    },
    reducers: {
        setLength: (state, action) => {
            state.length = action.payload;
        },
        setLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setDragging: (state, action) => {
            state.isDragging = action.payload;
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        }
    }
}) 

export const { setLength, setLocation, setDragging } = videoSlice.actions;
export default videoSlice.reducer;