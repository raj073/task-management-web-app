import React from 'react';
import Navbar from '../Pages/Navbar/Navbar';
import Footer from '../Pages/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Main = () => {

    return (

        <div>

            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default Main;