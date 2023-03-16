import logo from './logo.svg';
import './App.css';
import { Timer } from './components/timer';
import { TakeImage } from './camera-pages/take-image';
import { Camera } from './components/camera-box2';
function App() {
  return (
    <div className="App">
      <TakeImage imageType='side' svgType='side'/>
    </div>
  );
}

export default App;
