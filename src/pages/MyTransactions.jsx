import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
const MyTransactions = () => {
    const { user } = use(AuthContext);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/transactions?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setTransactions(data)
                }).catch(error => {
                    console.log(error)
                })
        }
    }, [user])

    // Delete
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/transactions/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your transaction has been deleted.",
                                icon: "success"
                            });
                            const remainingTransactions = transactions.filter(transaction => transaction._id !== _id);
                            setTransactions(remainingTransactions)
                        }
                    })
            }
        });
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">My Transactions</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {transactions.map((t) => (
                    <div key={t._id} className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <h3 className="text-lg font-bold capitalize">{t.category}</h3>
                            <p>
                                <span className="font-semibold">Type:</span>{" "}
                                {t.type}
                            </p>
                            <p>
                                <span className="font-semibold">Amount:</span> ৳{t.amount}
                            </p>
                            <p>
                                <span className="font-semibold">Date:</span>{" "}
                                {new Date(t.date).toLocaleDateString()}
                            </p>

                            <div className="card-actions justify-between mt-4">
                                <Link to={`/transactionDetails/${t._id}`} className="btn btn-sm btn-info">View Details</Link>
                                <Link
                                    to={`/updateTransaction/${t._id}`}
                                    className="btn btn-sm btn-warning">Update</Link>
                                <button
                                    onClick={() => handleDelete(t._id)}
                                    className="btn btn-sm btn-error">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTransactions;