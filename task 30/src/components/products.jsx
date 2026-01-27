import React from 'react'
import { products } from "../db.js"
import Product from './product.jsx';

function Products() {
    console.log(products);

    return (
        <div className='container w-[90%] m-auto '>
            <h1 className='text-[purple] text-[60px] text-center'>Laura Beauty</h1>
            <div className='grid grid-cols-4 gap-8'>
                {
                    products.map((e,i) => (
                        <Product pro={e} key={i} />
                    ))

                }
            </div>
        </div>
    )
}

export default Products
