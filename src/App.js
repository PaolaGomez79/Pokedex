import React from 'react'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pokemon from './components/Pokemon'
import Moves from './components/Moves'
import NotFound from './components/NotFound'
import './App.css';
import ThemeContext, { themes } from './context/context';
import {useState} from 'react';
import Buscar from './components/Buscar'

function App() {

  const [theme, setTheme] = useState(themes.light);

  const handleChangeTheme = () => {
    // console.log(theme);
    setTheme(() => {
      return theme === themes.dark ? themes.light : themes.dark 
    });
   
  };

  return (
    <>
      <ThemeContext.Provider value={{theme, handleChangeTheme }}>
        <BrowserRouter>
          {/* <Navbar/> */}
          <Routes>
            <Route path='/' element={<Navbar/>}>
              <Route  index element={<Home/>}/>           
              <Route  path='/:pokeName' element={<Pokemon/>} />
              <Route  path='/:pokeName/:pokeId' element={<Moves/>} />
              <Route path='/buscar' element={<Buscar/>} />
              <Route path='*' element={<NotFound/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>                                                                                                                                                             
  );
}

export default App;


