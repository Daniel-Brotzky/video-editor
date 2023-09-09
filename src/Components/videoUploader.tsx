import { ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLength } from "../state/VideoReducer";

const VideoUploader = () => {
    const videoElement = useRef<HTMLVideoElement>(null);
    const videoSource = useRef<HTMLSourceElement>(null);
    const dispatch = useDispatch();

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
                }
            }
          }
      
          reader.readAsDataURL(event.target.files[0]);
        }
      }


    return (
        <div>
            <input type="file" accept="video/*" onChange={handleUploadVideo}/>
            <hr />
            <video controls ref={videoElement} height="400px">
                <source ref={videoSource} />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default VideoUploader;