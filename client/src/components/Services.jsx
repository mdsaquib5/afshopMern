import React from "react";
import { services } from "../assets/assets";

const Services = () => {
  return (
    <>
      <div className="bg-gray-100 p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {services.map((item, index) => (
                <div key={index} className='flex gap-5 items-center justify-center'>
                    <img src={item.image} alt=""width={60} height={60} className="w-8 h-8 lg:w-12 lg:h-12 lx:w-16 xl:h-16" />
                    <div className="text-xs lg:text-sm xl:text-base">{item.text}</div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Services;