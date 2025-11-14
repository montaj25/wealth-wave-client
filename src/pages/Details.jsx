import React from 'react';
import { useLoaderData } from 'react-router';

const Details = () => {
    const { type, description, amount, date, category, categoryTotal } = useLoaderData()
    // console.log(transaction)
    return (
        <div className='max-w-2xl mx-auto mt-15 card bg-base-200 shadow-2xl'>
            <div className='card-body'>
                <h2 className='card-title text-primary text-2xl mb-4'>Transaction Details</h2>
                <div className='space-y-3 text-lg'>
                    <p><span className='font-semibold'>Type:</span>{" "}<span className='capitalize'>{type}</span></p>
                    <p><span className='font-semibold'>Description:</span>{" "}<span className='capitalize'>{description || "No description"}</span></p>
                    <p><span className='font-semibold'>Amount:</span>{" "}<span>৳{amount}</span></p>
                    <p><span className='font-semibold'>Date:</span>{" "}<span>{new Date(date).toLocaleDateString()}</span></p>
                    <p><span className='font-semibold'>Category:</span>{" "}<span className='capitalize'>{category}</span></p>
                </div>
                <div className='divider'></div>
                <p className='text-lg font-semibold'>
                    Total spent/saved in this category ({category}) : {" "}
                    <span className='text-primary font-bold'>৳{categoryTotal}</span>
                </p>
            </div>
        </div>
    );
};

export default Details;