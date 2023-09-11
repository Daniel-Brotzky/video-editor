import TimelineRuler from "./TimelineRuler";
import './Timeline.css';
import TimelinePicker from "./TimelinePicker";
import TimelineBlocks from "./TimelineBlocks";

const Timeline = () => {
    return (
        <div className="timeline-container">
            <TimelineRuler />
            <TimelinePicker />
            <TimelineBlocks />
        </div>
    )
}

export default Timeline;