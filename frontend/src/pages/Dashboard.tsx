import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Navbar';

const Dashboard: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user);

    return (
        <div className="">
            <Header />
            <h1 className="text-2xl">Welcome, {user?.name}!</h1>
        </div>
    );
};

export default Dashboard;
