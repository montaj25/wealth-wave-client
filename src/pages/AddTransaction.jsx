import React, { use, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const AddTransaction = () => {
    const { user } = use(AuthContext);
    const [formData, setFormData] = useState({
        type: "",
        category: "",
        amount: "",
        description: "",
        date: "",
    });

    const [categories, setCategories] = useState([]); // dynamic category list

    // All possible categories
    const allCategories = {
        income: ["Salary", "Freelance", "Bonus", "Gift", "Investment", "Others"],
        expense: ["Home", "Food", "Transport", "Shopping", "Bills", "Entertainment", "Others"],
    };

    // Handles all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // When 'type' changes, reset category and load new options
        if (name === "type") {
            setFormData({ ...formData, type: value, category: "" });
            setCategories(allCategories[value] || []);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const transactionData = {
            ...formData,
            amount: parseFloat(formData.amount),
            email: user?.email,
            name: user?.displayName || "Anonymous",
        };

        fetch("http://localhost:3000/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transactionData),
        })
            .then((res) => res.json())
            .then(() => {
                Swal.fire("Success!", "Transaction added successfully!", "success");
                setFormData({
                    type: "",
                    category: "",
                    amount: "",
                    description: "",
                    date: "",
                });
                setCategories([]);
            })
            .catch(() => {
                Swal.fire("Error!", "Failed to add transaction", "error");
            });
    };

    return (
        <div className="max-w-lg mx-auto bg-base-200 p-8 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Category</option>
                    {
                        categories.map((cat) => (<option key={cat} value={cat.toLowerCase()}>
                            {cat}
                        </option>))
                    }
                </select>

                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <button type="submit" className="btn btn-primary w-full">
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;