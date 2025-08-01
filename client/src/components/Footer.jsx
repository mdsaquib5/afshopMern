import React from "react";
import {Link} from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";
import Services from "./Services";
import Instagram from "./Instagram";

const Footer = () => {
  return (
    <>
      <Services />
      <Instagram />
      <div className="mx-auto px-3 lg:px-6 xl:px-12 bg-black afContainer">
        <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between gap-10 py-8 border-b border-gray-500/30 text-gray-400">
          <div>
            <img className="logo filter invert" src={assets.logo} alt="logo" />
            <div className="flex flex-col gap-2 mt-6">
                <p>AFOnlineShop New Delhi, India</p>
                <p><Link to={'mailto:afonlineshop7@gmail.com'}>afonlineshop7@gmail.com</Link></p>
                <p><Link to={'tel:+91 9773821756'}>+91 9773821756</Link></p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Shop the Latest Trending Shoes at the Best Prices</p>
            <p>Easy 7-Day Returns & Exchanges</p>
            <p>Free Shipping - Across India</p>
          </div>
          <div className="flex flex-wrap justify-between w-full lg:w-[30%] gap-5">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base text-gray-200 md:mb-5 mb-2">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="hover:underline transition">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
          Copyright {new Date().getFullYear()} © afonlineshop All Right
          Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;