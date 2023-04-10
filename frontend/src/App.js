import './App.css';
import { TakeImage } from './camera-pages/take-image';
import { ViewImage } from './camera-pages/view-image';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculating from './camera-pages/calculating';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Login } from './auth-pages/login';
import { Register } from './auth-pages/register';
import { ViewAccount } from './user-pages/view-account';
import { EditAccount } from './user-pages/edit-account';
import { AuthProvider } from './contexts/auth-context';
import { ViewMeasurements } from './user-pages/view-measurements';
import { SelectPoint } from './select-points-pages/select-point';
import Calculated from './camera-pages/calculated';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
        <Routes>
          <Route path='/take-image' element={<TakeImage/>}/>
          <Route path='/view-image' element={<ViewImage/>}/>
          <Route path='/calculating' element={<Calculating/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/account' element={<ViewAccount/>}/>
          <Route path='/edit' element={<EditAccount/>}/>
          <Route path='/measurements' element={<ViewMeasurements/>}/>
          <Route path='/select' element={<SelectPoint/>}/>
          <Route path='/calculated' element={<Calculated/>}/>
        </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
