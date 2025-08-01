import React from "react";
import { Link } from "react-router-dom";
import { popularProducts } from "../assets/assets";

const PopularCategory = () => {
  return (
    <>
      <div className="mt-10 xl:mt-16">
        <div className="flex flex-col items-end w-max mb-8">
            <p className="text-2xl font-medium uppercase">Popular Products</p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {popularProducts.map((item, index) => (
                <div key={index} className='flex flex-col items-center relative'>
                    <img src={item.image} alt="" className="w-full rounded" />
                    <div className="absolute bottom-0 flex flex-col items-center gap-3 pb-5">
                        <div className="text-white text-xl xl:text-2xl font-medium capitalize">{item.text}</div>
                        <Link to={item.link} className="group flex items-center gap-2 md:px-6 px-4 py-2 text-xs md:text-base lg:text-sm xl:text-lg text-black bg-white transition rounded cursor-pointer w-fit">{item.linkText}</Link>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PopularCategory;