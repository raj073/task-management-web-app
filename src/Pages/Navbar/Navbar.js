import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../Contexts/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/signin");
        toast.success("User Successfully Logout", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#1D283A]">
      <header className={classes.header}>
        <div className={classes.header__content}>
          <Link to="/" className={classes.header__content__logo}>
            Task Management
          </Link>
          <nav
            className={`${classes.header__content__nav} ${
              menuOpen && size.width < 768 ? classes.isMenu : ""
            }`}
          >
            <ul>
              <li>
                <Link to="/" onClick={menuToggleHandler}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/addtask" onClick={menuToggleHandler}>
                  Add Task
                </Link>
              </li>
              <li>
                <Link to="/mytasks" onClick={menuToggleHandler}>
                  My Tasks
                </Link>
              </li>
              <li>
                <Link to="/completedtask" onClick={menuToggleHandler}>
                  Completed Tasks
                </Link>
              </li>
            </ul>

            {user?.uid ? (
              <>
                {user?.photoURL ? (
                  <>
                    <img
                      className="object-cover w-12 h-12 border-2 border-green-600 rounded-full"
                      src={user?.photoURL}
                      alt="Avatar"
                    />
                  </>
                ) : (
                  <>
                    <li>
                      <Link>{user?.displayName}</Link>
                    </li>
                  </>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link onClick={menuToggleHandler}>
                  <button onClick={handleSignOut}>Sign Out</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={menuToggleHandler}>
                  <button>Sign In</button>
                </Link>
              </>
            )}
          </nav>
          <div className={classes.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
