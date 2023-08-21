import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Authentication from './pages/Authentication';
import Layout from './pages/Layout';
import Create from './pages/Create';
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import Calendar from './pages/Calendar';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={<Authentication/>}/>

      <Route path='user' element={<Layout/>}>

        <Route index element={<Home/>}/>
        <Route path="/user/create" element={<Create/>} />
        <Route path='/user/calendar' element={<Calendar/>}/>
        <Route path='/user/favourites' element={<Favourite/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
