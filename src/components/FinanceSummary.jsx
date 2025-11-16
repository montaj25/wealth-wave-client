import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
// import  from 'react-router';

const FinanceSummary = ({ transactions }) => {
    const [categoryData, setCategoryData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        let income = 0;
        let expense = 0;

        const categoryTotals = {};
        transactions.forEach(t => {
            const amount = parseFloat(t.amount) || 0;
            if (t.type === "income") income += amount;
            else expense += amount;

            if (categoryTotals[t.category]) categoryTotals[t.category] += amount;
            else categoryTotals[t.category] = amount;
        });

        const pieData = Object.keys(categoryTotals).map(key => ({
            name: key,
            value: categoryTotals[key]
        }));

        setCategoryData(pieData);
        setTotalIncome(income);
        setTotalExpense(expense);
    }, [transactions])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Financial Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary Box */}
                <div className="card bg-base-200 p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Summary</h3>
                    <p className="text-lg"><span className="font-semibold">Total Income:</span> <span className="text-green-600 font-bold">৳{totalIncome}</span></p>
                    <p className="text-lg"><span className="font-semibold">Total Expenses:</span> <span className="text-red-600 font-bold">৳{totalExpense}</span></p>
                    <p className="text-lg mt-2"><span className="font-semibold">Net Total:</span> <span className="text-primary font-bold">৳{totalIncome - totalExpense}</span></p>
                </div>

                {/* Pie Chart */}
                <div className="card bg-base-200 p-6 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={(entry) => `${entry.name} (${((entry.value / (totalIncome + totalExpense)) * 100).toFixed(1)}%)`}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill='#0088FE' />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `৳${value}`} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FinanceSummary;