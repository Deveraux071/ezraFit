import './App.css';
import { TakeImage } from './camera-pages/take-image';
import { ViewImage } from './camera-pages/view-image';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/take-image' element={<TakeImage/>}/>
        <Route path='/view-image' element={<ViewImage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
