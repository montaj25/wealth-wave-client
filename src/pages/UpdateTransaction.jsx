import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateTransaction = () => {
    const transaction = useLoaderData();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: transaction?.type || "",
        category: transaction?.category || "",
        amount: transaction?.amount || "",
        description: transaction?.description || "",
        date: transaction?.date || ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/transactions/${transaction._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Transaction updated successfully!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    navigate(`/transactionDetails/${transaction._id}`);
                }
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Transaction</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-5">

                {/* Type */}
                <div>
                    <label className="label font-semibold">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expanse">Expanse</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="label font-semibold">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="label font-semibold">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="label font-semibold">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Update Transaction
                </button>
            </form>
        </div>
    );
};

export default UpdateTransaction;