import React from 'react';
import { instagram } from "../assets/assets";
import {BrandInstagramIcon} from '@inertiapixel/react-icons';

const Instagram = () => {
  return (
    <>
        <div className='grid grid-cols-7'>
            {instagram.map((item, index) => (
                <div key={index} className='relative overflow-hidden group'>
                    <img src={item.image} alt="" className='w-full h-full' />
                    <div className='flex justify-center items-center group-hover:bg-black/70 inset-0 absolute transition duration-300 ease-in-out'>
                        <div className='bg-white w-10 h-10 rounded-full flex items-center opacity-0 group-hover:opacity-100 justify-center transition ease-in-out'>
                            <BrandInstagramIcon width={30} height={30} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default Instagram;