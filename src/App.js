import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { createContext } from 'react';

import Clases from "./Components/Clases";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Class from "./Components/Class";

export const Context = createContext({});

function App() {
  let estadoDefecto = true;
  const localStorageUser = JSON.parse(localStorage.getItem("currentUser"));
  if (localStorageUser && localStorageUser.id) {
    estadoDefecto = localStorageUser;
  };

  const [currentUser, setCurrentUser] = useState(estadoDefecto);


  return !currentUser ? (
    <Context.Provider value={{
      currentUser,
      setCurrentUser,
    }} >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Context.Provider>
  ) : (
    <Context.Provider value={{
      currentUser,
      setCurrentUser,
    }} >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Clases />} />
          <Route path="/classe/:id" element={<Class />} />
        </Routes>
      </Router>
    </Context.Provider>

  )
};

export default App;



{/* <Router>
<h1>ADMIN</h1>
<div>
  <nav>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/clases">Clases</Link>
      </li>
    </ul>
  </nav>

  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/clases" element={<Clases />} />
  </Routes>
</div>
</Router>
</Context.Provider> */}