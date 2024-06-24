import React from 'react';
import { fetchListofProducts } from '../actions';

const ServerActions = async() => {
    const products = await fetchListofProducts();
    
    return (
        <div className='text-center my-4'>
            <h1 className='text-3xl font-bold mb-4'>Server Actions Example</h1>
            <ul>
                {
                    products && products.length > 0 ?
                        products.map(item => <li className='font-bold'>{item.title}</li>) : <h2 className='text-xl font-bold'>No Products Here</h2>
                }
            </ul>
        </div>
    );
};

export default ServerActions;