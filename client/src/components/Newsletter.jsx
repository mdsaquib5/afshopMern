import React from "react";
import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
    <>
      <div className="my-10 md:my-14 bg-[url('/images/hero-banner-1.jpg')] bg-cover bg-center relative px-6 py-10 md:py-22 xl:px-20 xl:py-50 rounded">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="md:text-5xl text-2xl font-semibold text-white">
            {`Don’t miss our daily amazing deals.`}
          </h1>
          <p className="md:text-lg text-white/90 pb-8">
            Subscribe to get the latest offers, new arrivals, and exclusive
            discounts
          </p>
          <Link to={"/products"} className="group flex items-center gap-2 md:px-6 px-4 py-2 text-xs md:text-base lg:text-sm xl:text-lg text-black bg-white transition rounded cursor-pointer w-fit"> Shop Now</Link>
        </div>
      </div>
    </>
  );
};

export default Newsletter;