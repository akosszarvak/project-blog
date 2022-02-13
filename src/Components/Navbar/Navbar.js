import react, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

export default function Navbar({ isAuth, setIsAuth }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => {
    if (window.innerWidth <= 768) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };
  return (
    <div className="nav-outer">
      <div className="nav-container flex">
        <div className="left-col">
          <Link className="logo" to="/" onClick={closeMobileMenu}>
            logo
          </Link>
        </div>

        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <div className={click ? "nav-menu active" : "nav-menu"}>
          <Link className="links" to="/" onClick={closeMobileMenu}>
            home
          </Link>
          {!isAuth ? (
            <Link className="links" to="/login" onClick={closeMobileMenu}>
              login
            </Link>
          ) : (
            <Link
              className="links"
              to="/"
              onClick={() => {
                closeMobileMenu();
                signUserOut();
              }}
            >
              logout
            </Link>
          )}
          {isAuth && (
            <Link className="links" to="/createpost" onClick={closeMobileMenu}>
              create post
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
