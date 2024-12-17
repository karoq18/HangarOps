import React from 'react';
import AppNavbar from './AppNavbar'; 

const Layout = ({ children }) => {
    return (
        <>
            <AppNavbar />
            <div>{children}</div>
        </>
    );
};

export default Layout;
