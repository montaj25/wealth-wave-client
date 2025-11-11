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
        <div>
            <h2>hi i am from overview: { }</h2>
        </div>
    );
};

export default Overview;