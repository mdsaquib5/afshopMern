import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [ filterProducts, setFilterProducts ] = useState([]);

    useEffect(() => {
      if (searchQuery.length > 0) {
        setFilterProducts(products.filter(
            product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      }else{
        setFilterProducts(products);
      }
    }, [products, searchQuery])
    
  return (
    <>
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-3 md:gap-6'>
                {
                    filterProducts.filter((product)=> product.inStock).map( (product, index)=> (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default AllProducts;