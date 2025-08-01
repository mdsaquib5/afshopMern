import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Categories = () => {
    const {navigate} = useAppContext();
  return (
    <>
        <div className='mt-16'>
            <div className="flex flex-col items-end w-max mb-8">
                <p className="text-2xl font-medium uppercase">Our Categories</p>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
            </div>
            {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
                
            {
                categories.map((item, index)=>(
                    <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center' style={{background: item.bgColor}} onClick={()=> {
                        navigate(`/products/${item.path.toLowerCase()}`);
                        scrollTo(0, 0);
                    }
                    }>
                        <img src={item.image} alt={item.text}className='group-hover:scale-108 transition max-w-28' />
                        <p className='text-sm font-medium capitalize'>{item.text}</p>
                    </div>
                ))
            }
            
            </div> */}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10'>
            {
                    categories.map((item, index)=>(
                        <div key={index} className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center categoryProducts' style={{background: item.bgColor}} onClick={()=> {
                            navigate(`/products/${item.path.toLowerCase()}`);
                            scrollTo(0, 0);
                        }
                        }>
                            <img src={item.image} alt={item.text}className='group-hover:scale-108 transition' />
                            <p className='font-medium uppercase text-md absolute bottom-18 text-white'>{item.text}</p>
                        </div>
                    ))
                }
        </div>
    </>
  )
}

export default Categories;