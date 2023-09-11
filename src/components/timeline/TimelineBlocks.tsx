import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useRef } from "react";
import { reorderBlock, splitBlock, timeBlock } from "../../state/VideoReducer";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

interface SortableBlockProps {
    block: timeBlock
    width: number
}

const SortableBlock: React.FC<SortableBlockProps> = ({ block, width }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: block.id});
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        width: width
    }

    return (
        <div
            className="timeline-block"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
        </div>
    )
}

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            dispatch(reorderBlock({
                oldIndex: blocks.map((b) => b.id).indexOf(active.id as number),
                newIndex: blocks.map((b) => b.id).indexOf(over.id as number)
            }))
        }
    }

    return (
        <div>
            <div className="timeline-blocks-wrapper" ref={wrapperRef}>
                <DndContext
                    modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext    
                        items={blocks}
                        strategy={horizontalListSortingStrategy}
                    >
                        {blocks.map(block => <SortableBlock key={block.id} block={block} width={getWidth(block)} />)}
                    </SortableContext>
                </DndContext>
            </div>
            <button onClick={() => dispatch(splitBlock())}>cut</button>
        </div>
    )
}

export default TimelineBlocks;