import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initVideo, setLocation, setPlaying, setVideoLocation } from "../state/VideoReducer";
import { RootState } from "../state/store";
import VideoControls from "./VideoControls";
import "./Video.css"

const VideoUploader = () => {
    const videoElement = useRef<HTMLVideoElement>(null);
    const videoSource = useRef<HTMLSourceElement>(null);
    // const currentLocation = useSelector((state: RootState) => state.video.currentLocation);
    const videoLocation = useSelector((state: RootState) => state.video.videoLocation);
    const isDragging = useSelector((state: RootState) => state.video.isDragging);
    const isPlaying = useSelector((state: RootState) => state.video.isPlaying);
    const dispatch = useDispatch();

    useEffect(() => {
        // video.play() is async
        if (isPlaying && videoElement.current) {
            videoElement.current.play();
        }
        console.log(videoLocation);
    }, [isPlaying, videoElement])

    if (!isPlaying && videoElement.current) {
        videoElement.current.pause();
    }

    const onTimeUpdate = useCallback(() => {
        if (videoElement.current) {
            dispatch(setVideoLocation(videoElement.current.currentTime));
        }  
    }, [dispatch, videoElement])

    const onVideoEnd = useCallback(() => {
        dispatch(setPlaying(false));
    }, [dispatch]);

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
                        dispatch(initVideo(videoElement.current?.duration));
                    }

                    videoElement.current.addEventListener('timeupdate', onTimeUpdate);
                    videoElement.current.addEventListener('ended', onVideoEnd);
                }
            }
          }
      
          reader.readAsDataURL(event.target.files[0]);
        }
    }

    useEffect(() => {
        if (videoElement?.current?.currentTime && isDragging) {
            videoElement.current.currentTime = videoLocation;
        }
        console.log(videoLocation);
    }, [videoLocation, isDragging]);


    return (
        <div>
            <input type="file" accept="video/*" onChange={handleUploadVideo}/>
            <hr />
            <div className="video-container">
                <video ref={videoElement} className="video">
                    <source ref={videoSource} />
                    Your browser does not support the video tag.
                </video>
                <VideoControls />
            </div>
        </div>
    )
}

export default VideoUploader;