import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';




// Internal imports
import { Home, Collection, Auth, Mastered } from './components';
import './index.css'
import { theme } from './Theme/themes';
import { firebaseConfig } from './fireBaseConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
   <ThemeProvider theme = { theme }>
  <Router>
    <Routes>
      <Route path='/' element={<Home title = { "Welcome. Come learn with me!" }/>} />
      <Route path='/auth' element={<Auth title = { "Welcome. Come learn with me!" }/>} /> 
      <Route path='/mastered' element={<Mastered />} />
        <Route path='/collection' element={<Collection />} />
    </Routes>
  </Router>
  </ThemeProvider>
  </FirebaseAppProvider>   
  </React.StrictMode>,
)