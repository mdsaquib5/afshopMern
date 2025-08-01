import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();

  return (
    <>
        <div className='mt-10 xl:mt-16'>
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase">Our Products</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-3 md:gap-6'>
              {
                products.filter( (product)=> product.inStock).slice(0,5).map( (product, index)=> (
                  <ProductCard product={product} key={index} />
                ))
              }
            </div>
        </div>
    </>
  )
}

export default BestSeller;