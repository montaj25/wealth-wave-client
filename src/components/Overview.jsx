import { useEffect, useState } from "react";
import Loading from "../pages/Loading";



const Overview = ({ email }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
            .then(res => res.json())
            .then(data => {
                const filteredData = data.filter(t => t.email === email)
                setTransactions(filteredData);
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [email])

    if (loading) {
        return <Loading></Loading>
    }

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(total => {
        if (total.type === "income") {
            totalIncome = totalIncome + total.amount;
            console.log(totalIncome)
        } else if (total.type === "expense") {
            totalExpense = totalExpense + total.amount;
            console.log(totalExpense)
        }
    })

    let availableBalance = totalIncome - totalExpense;
    console.log(availableBalance)

    return (
        <div className="px-4 md:px-10 lg:px-20 py-10">
            <h2 className="text-3xl font-bold mb-6 text-primary">Overview</h2>
            <div className="grid gap-6 md:grid-cols-3">

                {/* Balance */}
                <div className="card bg-base-200 p-4 shadow items-center">
                    <h3 className="font-bold text-2xl">Balance</h3>
                    <p className="text-2xl text-primary font-bold">
                        ৳{availableBalance}
                    </p>
                </div>
                {/* Income */}
                <div className="card bg-base-200 p-4 shadow items-center">
                    <h3 className="font-bold text-2xl">Income</h3>
                    <p className="text-2xl text-green-600 font-bold">
                        + ৳{totalIncome}
                    </p>
                </div>
                {/* Expenses */}
                <div className="card bg-base-200 p-4 shadow items-center">
                    <h3 className="font-bold text-2xl">Expenses</h3>
                    <p className="text-2xl text-red-600 font-bold">
                        – ৳{totalExpense}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Overview;