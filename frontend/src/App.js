import './App.css';
import { TakeImage } from './camera-pages/take-image';
import { ViewImage } from './camera-pages/view-image';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Test from './test';
import Calculating from './camera-pages/calculating';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/take-image' element={<TakeImage/>}/>
        <Route path='/view-image' element={<ViewImage/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/calculating' element={<Calculating/>}/>
      </Routes>
    </Router>
  );
}

export default App;
