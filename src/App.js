import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import React, { useState } from "react";

import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}></Navbar>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />}></Route>
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
