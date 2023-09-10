import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setPlaying } from "../state/VideoReducer";

const VideoControls = () => {
    const isPlaying = useSelector((state: RootState) => state.video.isPlaying);
    const dispatch = useDispatch();

    return (
        <div className={`video-controls ${isPlaying ? '' : 'show-controls'}`}>
            <div className={`progress-button ${isPlaying ? 'pause-button' : 'play-button'}`}
            onClick={() => dispatch(setPlaying(!isPlaying))}
            />
        </div>
    )
}

export default VideoControls;