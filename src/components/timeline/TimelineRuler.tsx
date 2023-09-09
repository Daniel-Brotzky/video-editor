import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const TimelineRuler = () => {
    const videoLength = useSelector((state: RootState) => state.video.length);
    const majorTicks = [] as number[];

    for(let i = 0; i <= 7; i++) {
        majorTicks.push((i/7) * videoLength);
    }

    return (
        <div className="timeline-ruler">
            <ul className="major-ticks-container">
                {majorTicks.map((tick, index) => (
                    <li className="major-tick">
                        {
                            index < majorTicks.length - 1 &&
                            <ul className="minor-ticks-container">
                            { 
                                majorTicks.map(t => (
                                    <li className="minor-tick"></li>
                                ))
                            }
                        </ul>    
                        }

                        <span className="major-tick-value">{tick.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TimelineRuler;