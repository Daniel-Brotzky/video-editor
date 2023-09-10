import { ChangeEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLength, setLocation } from "../state/VideoReducer";
import { RootState } from "../state/store";
import VideoControls from "./VideoControls";
import "./Video.css"

const VideoUploader = () => {
    const videoElement = useRef<HTMLVideoElement>(null);
    const videoSource = useRef<HTMLSourceElement>(null);
    const currentLocation = useSelector((state: RootState) => state.video.currentLocation);
    const isDragging = useSelector((state: RootState) => state.video.isDragging);

    const dispatch = useDispatch();

    function onTimeupdate(event: Event) {
        if (videoElement.current) {
            dispatch(setLocation(videoElement.current.currentTime / videoElement.current.duration));
        }
    }

    function handleUploadVideo(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
      
          reader.onload = function(e: ProgressEvent<FileReader>) {
            if (e && e.target?.result && videoElement.current) {
                const result = e.target.result;
                if (typeof result === 'string') {
                    videoSource.current?.setAttribute('src', result);
                    videoElement.current?.load();

                    videoElement.current.onloadedmetadata = () => {
                        dispatch(setLength(videoElement.current?.duration));
                    }

                    videoElement.current.addEventListener('timeupdate', onTimeupdate)
                }
            }
          }
      
          reader.readAsDataURL(event.target.files[0]);
        }
    }

    useEffect(() => {
        if (videoElement?.current?.currentTime && isDragging) {
            videoElement.current.currentTime = currentLocation * videoElement.current.duration;
        }
    }, [currentLocation, isDragging]);


    return (
        <div>
            <input type="file" accept="video/*" onChange={handleUploadVideo}/>
            <hr />
            <div className="video-container">
                <video controls ref={videoElement} className="video">
                    <source ref={videoSource} />
                    Your browser does not support the video tag.
                </video>
                <VideoControls />
            </div>
        </div>
    )
}

export default VideoUploader;