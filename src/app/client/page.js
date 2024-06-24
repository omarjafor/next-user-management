'use client'

import { useEffect, useState } from "react";
import { fetchListofProducts } from "../actions";

const ClientActions = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getListofProducts(){
        setLoading(true);
        const data = await fetchListofProducts();
        if(data){
            setProducts(data);
            setLoading(false);
        }
    }

    useEffect( () => {
        getListofProducts();
    } , []);

    if (loading) return <h1 className='text-3xl font-bold'>Products Loading... Please wait...</h1>

    return (
        <div className='text-center my-4'>
            <h1 className='text-3xl font-bold mb-4'>Client Actions Example</h1>
            <ul>
                {
                    products && products.length > 0 ?
                        products.map(item => <li className="font-bold">{item.title}</li>) : <h2 className='text-xl font-bold'>No Products Here</h2>
                }
            </ul>
        </div>
    );
};

export default ClientActions;