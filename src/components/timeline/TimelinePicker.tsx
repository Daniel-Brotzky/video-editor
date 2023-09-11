import { DndContext, useDraggable, DragEndEvent, DragStartEvent, DragMoveEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import {CSS} from '@dnd-kit/utilities';
import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setDragging, setLocation } from "../../state/VideoReducer";

interface PickerProps {
    left: number
}

const Picker: FC<PickerProps> = ({ left }) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'timeline-picker'
    });
    
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div className="timeline-picker" ref={setNodeRef}
        style={{
            ...style,
            left: left
        }}
        {...listeners}
        {...attributes}
        >

        </div>
    )
}

const TimelinePicker = () => {
    const [left, setLeft] = useState(0);
    const videoLocation = useSelector((state: RootState) => state.video.currentLocation);
    const videoLength = useSelector((state: RootState) => state.video.length);
    const isDragging = useSelector((state: RootState) => state.video.isDragging);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const changeLocation = (deltaX: number) => {
        if (wrapperRef.current) {
            const newLocation = ((left + deltaX) / wrapperRef.current.getBoundingClientRect().width) * videoLength;
            
            dispatch(setLocation(newLocation))
        }
    }

    const handleDragStart = (e: DragStartEvent) => {
        dispatch(setDragging(true));
    }

    const handleDragMove = ({ delta }: DragMoveEvent) => {
        changeLocation(delta.x);
    }

    const handleDragEnd = ({ delta }: DragEndEvent) => {
        dispatch(setDragging(false));
        setLeft(left + delta.x);
        changeLocation(delta.x);
    }

    useEffect(() => {
        if (!isDragging && wrapperRef.current && !isNaN(videoLocation)) {
            const newLeft = Math.min(videoLocation / videoLength, 1) * wrapperRef.current.getBoundingClientRect().width;
            setLeft(newLeft);
        }
    }, [videoLocation, videoLength, setLeft, isDragging, wrapperRef]);

    return (
        <div className="timeline-picker-wrapper" ref={wrapperRef}>
            <DndContext modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            >
                <Picker left={left}></Picker>
            </DndContext>
        </div>
    )
}

export default TimelinePicker;