import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-screen-2xl mx-auto flex flex-col min-h-screen'>

            <Navbar></Navbar>
            <div className='w-full px-4 md:px-8 lg:px-12 py-12 flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;