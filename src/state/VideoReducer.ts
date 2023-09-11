import { createSlice } from "@reduxjs/toolkit";

export interface timeBlock {
    index?: number,
    blockStart: number,
    blockEnd: number,
}

function getBlockIndex(time: number, blocks: timeBlock[]): number {
    let index = -1;

    for(let i = 0; i < blocks.length; i++) {
        if (time >= blocks[i].blockStart && time <= blocks[i].blockEnd) {
            index = i;
            break;
        }
    }

    return index;
}

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        length: 1, 
        currentLocation: 0,
        isDragging: false,
        isPlaying: false,
        blocks: [] as timeBlock[],
    },
    reducers: {
        initVideo: (state, action) => {
            state.length = action.payload;
            state.blocks.push({
                index: 0,
                blockStart: 0,
                blockEnd: action.payload
            })
        },
        setLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setDragging: (state, action) => {
            state.isDragging = action.payload;
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        splitBlock: (state) => {
            const time = state.currentLocation;
            const oldIndex = getBlockIndex(time, state.blocks);

            const newBlock1: timeBlock = {
                blockStart: state.blocks[oldIndex].blockStart,
                blockEnd: time,
            };

            const newBlock2: timeBlock = {
                blockStart: time,
                blockEnd: state.blocks[oldIndex].blockEnd,
            };

            state.blocks.splice(oldIndex, 1, newBlock1, newBlock2);
        }
    }
}) 

export const { initVideo, setLocation, setDragging, setPlaying, splitBlock } = videoSlice.actions;
export default videoSlice.reducer;