import React from "react";
import { Link } from 'react-router-dom';
import { collections } from "../assets/assets";

const Collections = () => {
  return (
    <>
      <div className="mt-24">
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
                    <div className="absolute inset-0 flex flex-col gap-5 items-center md:items-start justify-end md:justify-center md:pl-6 lg:pl-10 text-white">
                        <div className="text-yellow-400 font-medium uppercase tracking-[10px] text-sm absolute top-10 left-10">{item.subtext}</div>
                        <div className="text-white font-medium uppercase text-3xl">{item.name.title}<span className="block">{item.name.subname}</span></div>
                        <Link to={item.link} className="group flex items-center gap-2 px-7 md:px-9 py-3 text-black bg-white transition rounded cursor-pointer w-fit">{item.linkText}</Link>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Collections;