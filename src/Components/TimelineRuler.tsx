import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const TimelineRuler = () => {
    const videoLength = useSelector((state: RootState) => state.video.length);
    const majorTicks = [] as number[];

    for(let i = 0; i <= 7; i++) {
        majorTicks.push((i/7) * videoLength);
    }

    return (
        <div className="ruler">
            <ul className="ticks-container">
                {majorTicks.map(tick => (
                    <li className="major-tick">
                        <ul className="minor-ticks-container">
                            {majorTicks.map(t => (
                                <li className="minor-tick"></li>
                            ))}
                        </ul>    
                        <span className="major-tick-value">{tick}</span>
                    </li>
                ))}
                <li></li>
            </ul>
            ruler
        </div>
    )
}

export default TimelineRuler;