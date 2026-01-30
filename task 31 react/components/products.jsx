
import React,{useEffect,useState} from 'react'
import Product from './product.jsx'

function Products() {
    const [product, setProduct] = useState([])
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProduct(data.products)
            })
    }, [])
    return (
        <div className="container w-[90%] m-auto">
             <h1 className='text-center text-[purple] text-[50px]'>Laura</h1>
            <input type='text' className='w-[370px] h-[35px] border-2 border-[purple] focus:outline-none p-2' placeholder='search...' ></input>
           
            <div className='grid grid-cols-4 gap-8'>
                {
                    product.map((e, i) => {
                        return <Product  key={e.id} product={e} />
                    })
                }
            </div>

        </div>
    )
}

export default Products
