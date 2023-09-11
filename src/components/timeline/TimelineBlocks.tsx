import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useRef } from "react";
import { splitBlock, timeBlock } from "../../state/VideoReducer";

const TimelineBlocks = () => {
    const blocks = useSelector((state: RootState) => state.video.blocks);
    const videoLength = useSelector((state: RootState) => state.video.length);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    console.log(blocks);

    const getWidth = (block: timeBlock): number => {
        if (wrapperRef.current) {
            const blockDuration = block.blockEnd - block.blockStart;
            return (blockDuration / videoLength) * wrapperRef.current.getBoundingClientRect().width;
        };

        return 1;
    }

    return (
        <div>
            <div className="timeline-blocks-wrapper" ref={wrapperRef}>
                {blocks.map((block, index) => {
                    return (
                        <div
                        key={block.blockEnd + block.blockStart}
                        className="timeline-block"
                        style= {{
                            width: getWidth(block)
                        }}
                        
                        >
                        </div>
                    )
                })}
            </div>
            <button onClick={() => dispatch(splitBlock())}>cut</button>
        </div>
    )
}

export default TimelineBlocks;