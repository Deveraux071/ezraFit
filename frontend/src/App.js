import './App.css';
import { TakeImage } from './camera-pages/take-image';
import { ViewImage } from './camera-pages/view-image';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './test';
import Calculating from './camera-pages/calculating';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Login } from './auth-pages/login';
import { Register } from './auth-pages/register';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/take-image' element={<TakeImage/>}/>
          <Route path='/view-image' element={<ViewImage/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/calculating' element={<Calculating/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
