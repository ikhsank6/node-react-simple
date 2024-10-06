// src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
