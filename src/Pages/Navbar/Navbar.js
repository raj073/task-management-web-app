import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((p) => !p);

  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <div>
          <span className={styles.logo}>Task Management</span>
        </div>
        <div>
          <nav
            className={`${styles.nav} ${menuOpen ? styles[`nav--open`] : {}}`}
          >
            <Link className={styles.nav__item} to="/">
              Home
            </Link>
            <Link className={styles.nav__item} to="/">
              Add Task
            </Link>
            <Link className={styles.nav__item} to="/">
              My Task
            </Link>
            <Link className={styles.nav__item} to="/">
              Completed Tasks
            </Link>
            <div className={styles.nav__button__container}>
              <Button />
            </div>
          </nav>
        </div>
        <div>
          <div className={styles.header__button__container}>
            <Button />
          </div>
          <button className={styles.header__toggler} onClick={menuToggler}>
            {!menuOpen ? <BiMenuAltRight /> : <AiOutlineCloseSquare />}
          </button>
        </div>
      </div>
    </div>
  );
};

const Button = () => {
  return (
    <Link to="">
      <button className={styles.button}> Sign In</button>
    </Link>
  );
};

export default Navbar;
