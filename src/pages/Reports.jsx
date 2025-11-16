import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import FinanceSummary from '../components/FinanceSummary';

const Reports = () => {
    const { user } = use(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/transactions?email=${user.email}`)
            .then(res => res.json())
            .then(data => setTransactions(data))
    }, [user]);


    return (
        <div>
            <FinanceSummary transactions={transactions}></FinanceSummary>
        </div>
    );
};

export default Reports;