import React from 'react'

function Product({ product }) {
    return (
        <div>
            <img src={product?.thumbnail} alt="product" />
            <h2 className='text-[violet] text-[24px]'>{product?.title}</h2>
            <p className='text-[violet] text-[20px]'>{product?.price}AZN</p>
            <p className='text-[purple]  p-3 '>{product?.description}</p>
            <button className='border-2 border-[purple] p-2 bg-[purple] text-[pink] rounded-3xl cursor-pointer'>Add to card</button>
        </div>
    )
}

export default Product
