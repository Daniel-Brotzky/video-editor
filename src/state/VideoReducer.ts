import { createSlice } from "@reduxjs/toolkit";

export interface timeBlock {
    index?: number,
    blockStart: number,
    blockEnd: number,
    id: number
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
        pickerLocation: 0,
        videoLocation: 0,
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
                blockEnd: action.payload,
                id: 0 + action.payload
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
                id: state.blocks[oldIndex].blockStart + time
            };

            const newBlock2: timeBlock = {
                blockStart: time,
                blockEnd: state.blocks[oldIndex].blockEnd,
                id: time + state.blocks[oldIndex].blockEnd
            };

            state.blocks.splice(oldIndex, 1, newBlock1, newBlock2);
        },
        reorderBlock: (state, action) => {
            const { oldIndex, newIndex } = action.payload;

            state.blocks.splice(newIndex, 0, state.blocks.splice(oldIndex, 1)[0]);
        }
    }
}) 

export const { initVideo, setLocation, setDragging, setPlaying, splitBlock, reorderBlock } = videoSlice.actions;
export default videoSlice.reducer;