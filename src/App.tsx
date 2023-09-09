import './App.css';
import Timeline from './components/timeline/Timeline';
import VideoUploader from './components/videoUploader';

function App() {
  return (
    <div className="App">
      <VideoUploader />
      <Timeline />
    </div>
  );
}

export default App;
