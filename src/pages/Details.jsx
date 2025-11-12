import React from 'react';
import { useLoaderData } from 'react-router';

const Details = () => {
    const transaction = useLoaderData()
    console.log(transaction)
    return (
        <div>

        </div>
    );
};

export default Details;