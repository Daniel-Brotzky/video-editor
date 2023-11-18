import { createSlice } from "@reduxjs/toolkit";

export interface timeBlock {
    index?: number,
    blockStart: number,
    blockEnd: number,
    id: number
}

function getBlockIndexByVideoTime(time: number, blocks: timeBlock[]): number {
    let index = -1;

    for(let i = 0; i < blocks.length; i++) {
        if (time >= blocks[i].blockStart && time <= blocks[i].blockEnd) {
            index = i;
            break;
        }
    }

    return index;
}

function getBlockBySliderTime(time: number, blocks: timeBlock[]): {index: number, accTime: number} {
    let accTime = 0;

    for(let i = 0; i < blocks.length; i++) {
        accTime += blocks[i].blockEnd - blocks[i].blockStart;
        if (accTime >= time) {
            return {
                index: i,
                accTime: accTime - blocks[i].blockEnd + blocks[i].blockStart
            }
        }
    }

    return {
        index: -1,
        accTime: 0,
    };
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
        setPickerLocation: (state, action) => {
            const newTime = action.payload;
            const { index, accTime } = getBlockBySliderTime(newTime, state.blocks);
            console.log(index);

            state.pickerLocation = newTime;
            if (index > -1) {
                state.videoLocation = newTime - accTime + state.blocks[index].blockStart;
            }
            // console.log(newTime - state.blocks[blockIndex].blockStart);
        },
        setVideoLocation: (state, action) => {
            const oldVideoTime = state.videoLocation;
            const newVideoTime = action.payload;
            const newPickerTime = state.pickerLocation + (newVideoTime - oldVideoTime);

            state.videoLocation = newVideoTime;
            state.pickerLocation = newPickerTime;

            const {index: blockIndex, accTime } = getBlockBySliderTime(state.pickerLocation, state.blocks);

            if (blockIndex > -1 &&
                blockIndex < state.blocks.length - 1 &&
                state.blocks[blockIndex].blockEnd - newPickerTime <= 0.01)
                {
                const currentBlock = state.blocks[blockIndex];
                const nextBlock = state.blocks[blockIndex + 1];
                state.videoLocation = nextBlock.blockStart + 0.01;
                state.pickerLocation = accTime + (currentBlock.blockEnd - currentBlock.blockStart) + 0.01;
                // state.pickerLocation = nextBlock.blockStart + 0.01;
                // state.pickerLocation = newPickerTime + 0.01;
            }


        },
        setLocation: (state, action) => {
            console.log('set loaction');
            state.currentLocation = action.payload;
        },
        setDragging: (state, action) => {
            state.isDragging = action.payload;
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        splitBlock: (state) => {
            const time = state.pickerLocation;
            const { index: oldIndex } = getBlockBySliderTime(time, state.blocks);

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
            const currentTime = state.pickerLocation;

            state.blocks.splice(newIndex, 0, state.blocks.splice(oldIndex, 1)[0]);
            
            const { index, accTime } = getBlockBySliderTime(currentTime, state.blocks);

            state.pickerLocation = currentTime;
            if (index > -1) {
                state.videoLocation = currentTime - accTime + state.blocks[index].blockStart;
            }
        }
    }
}) 

export const { initVideo, setLocation, setDragging, setPlaying, splitBlock, reorderBlock, setPickerLocation, setVideoLocation } = videoSlice.actions;
export default videoSlice.reducer;