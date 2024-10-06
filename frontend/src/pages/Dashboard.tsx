import React from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';

const Dashboard: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user);
    return (
        <Layout>
            <div className="">
                <h1 className="text-2xl">Welcome, {user?.name}!</h1>
            </div>
        </Layout>
    );
};

export default Dashboard;
