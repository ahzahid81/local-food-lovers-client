import React from 'react';
import Navbar from '../Components/Common/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer';

const MainLayouts = () => {
    return (
        <div>
            <div className='min-h-screen flex flex-col' data-theme="foodieTheme">
                <Navbar></Navbar>
                <main className=' flex-1 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6'>
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayouts;