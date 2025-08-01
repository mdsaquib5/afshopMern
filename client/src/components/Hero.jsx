import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowNarrowRightIcon } from '@inertiapixel/react-icons';

const Hero = () => {
  const heroSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="relative">
        <Slider {...heroSlider}>
          <div className="outline-none relative">
            <img
              src="/images/hero-banner-1.jpg"
              className="w-full md:h-full h-[440px] object-cover rounded"
              alt=""
              width={1920}
              height={900}
            />
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
              <h1 className="capitalize text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
                Freshness You can trust, saving you will love!
              </h1>
              <div className="flex items-center mt-6 font-medium">
                <Link
                  to={"/products"}
                  className="group group flex items-center gap-2 px-7 md:px-9 py-3 text-black bg-white transition rounded cursor-pointer w-fit"
                >
                  Shop Now <ArrowNarrowRightIcon width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>
          <div className="outline-none relative">
            <img
              src="/images/hero-banner-1.jpg"
              className="w-full md:h-full h-[440px] object-cover rounded"
              alt=""
              width={1920}
              height={900}
            />
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
              <h1 className="capitalize text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
                Freshness You can trust, saving you will love!
              </h1>
              <div className="flex items-center mt-6 font-medium">
              <Link
                  to={"/products"}
                  className="group group flex items-center gap-2 px-7 md:px-9 py-3 text-black bg-white transition rounded cursor-pointer w-fit"
                >
                  Shop Now <ArrowNarrowRightIcon width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>
          <div className="outline-none relative">
            <img
              src="/images/hero-banner-1.jpg"
              className="w-full md:h-full h-[440px] object-cover rounded"
              alt=""
              width={1920}
              height={900}
            />
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
              <h1 className="capitalize text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
                Freshness You can trust, saving you will love!
              </h1>
              <div className="flex items-center mt-6 font-medium">
                <Link
                  to={"/products"}
                  className="group group flex items-center gap-2 px-7 md:px-9 py-3 text-black bg-white transition rounded cursor-pointer w-fit"
                >
                  Shop Now <ArrowNarrowRightIcon width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Hero;