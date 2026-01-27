import React from 'react'

function Product({pro}) {
    return (
        <div>
            <img src={pro.thumbnail} alt="product"/>
            <div className='bg-[pink] p-3'>
                <h2 className='text-[purple] text-[30px]'>{pro.title}</h2>
                <p className='text-[purple] text-[24px]'>{pro.price}</p>
                <p className='text-[16px]'>{pro.description}</p>
            </div>
        </div>
    )
}

export default Product
