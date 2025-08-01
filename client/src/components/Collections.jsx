import React from "react";
import { Link } from 'react-router-dom';
import { collections } from "../assets/assets";

const Collections = () => {
  return (
    <>
      <div className="mt-10 md:mt-16">
        <div className="flex flex-col items-end w-max mb-8">
          <p className="text-2xl font-medium uppercase">Latest Collections</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mt-10">
          {collections.map((item, index) => (
                <div key={index} className='relative'>
                    <div>
                        <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover rounded"
                            width={1920}
                            height={900}
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col gap-5 items-start justify-center pl-3 md:pl-10 text-white">
                        <div className="text-yellow-400 font-medium uppercase md:tracking-[10px] text-xs md:text-sm lg:text-xs xl:text-sm absolute top-3 left-3 md:top-10 md:left-10">{item.subtext}</div>
                        <div className="text-white font-medium uppercase text-base md:text-3xl lg:text-xl xl:text-3xl">{item.name.title}<span className="block">{item.name.subname}</span></div>
                        <Link to={item.link} className="group flex items-center gap-2 md:px-6 px-4 py-2 text-xs md:text-base lg:text-sm xl:text-lg text-black bg-white transition rounded cursor-pointer w-fit">{item.linkText}</Link>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Collections;