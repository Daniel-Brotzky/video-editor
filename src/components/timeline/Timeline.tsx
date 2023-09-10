import TimelineRuler from "./TimelineRuler";
import './Timeline.css';
import TimelinePicker from "./TimelinePicker";

const Timeline = () => {
    return (
        <div className="timeline-container">
            <TimelineRuler />
            <TimelinePicker />
        </div>
    )
}

export default Timeline;