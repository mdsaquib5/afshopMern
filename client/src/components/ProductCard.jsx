import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { ShoppingCart1Icon, Star1Icon } from '@inertiapixel/react-icons';

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <>
        <div
          onClick={() => {
            navigate(
              `/products/${product.category.toLowerCase()}/${product._id}`,
            );
            scrollTo(0, 0);
          }}
          className="border border-gray-100 rounded cursor-pointer"
        >
          <div className="aspect-video bg-neutral-100/50 p-4">
            <img src={product.image[0]} alt={product.name} width={800} height={400} className="h-80 object-cover" />
          </div>
          <div className="flex flex-col gap-2 text-sm p-3">
            <p>{product.category}</p>
            <p className="text-gray-700 font-medium text-lg truncate w-full line-clamp-1">
              {product.name}
            </p>
            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="rating"
                    className="md:w-3.5 w-3"
                    key={i}
                  />
                ))}
              <p className="text-gray-400">({4})</p>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-6 items-center">
                <div className="md:text-2xl text-base font-medium text-primary">
                  {currency}
                  {product.offerPrice}{" "}
                </div>
                <div className="text-gray-500/60 md:text-sm text-xs line-through">
                  {currency}
                  {product.price}
                </div>
              </div>
              <div className="text-green md:text-sm text-xs">
                {currency}
                {product.discountPercent}%
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-primary"
              >
                {!cartItems[product._id] ? (
                  <button
                    className="flex items-center justify-center gap-1 bg-primary text-white md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
                    onClick={() => addToCart(product._id)}
                  >
                    <ShoppingCart1Icon width={20} height={20} /> 
                    Add
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                    <button
                      onClick={() => {
                        removeFromCart(product._id);
                      }}
                      className="cursor-pointer text-md px-2 h-full"
                    >
                      -
                    </button>
                    <span className="w-5 text-center">
                      {cartItems[product._id]}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(product._id);
                      }}
                      className="cursor-pointer text-md px-2 h-full"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white">
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {Array(5)
              .fill("")
              .map((_, i) =>
                  <img src={ i <4 ? assets.star_icon : assets.star_dull_icon} alt="rating" className="md:w-3.5 w-3" key={i} />
              )}
            <p>({4})</p>
          </div>
          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-primary">
              {currency}{product.offerPrice} {' '}
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}{product.price}
              </span>
              <span className="text-primary md:text-sm text-xs ml-5">
              {currency}{product.discountPercent}%
              </span>
            </p>
            <div onClick={e => {e.stopPropagation()}} className="text-primary">
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart-icon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => {removeFromCart(product._id)}}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">{cartItems[product._id]}</span>
                  <button
                    onClick={() => {addToCart(product._id)}}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
      </>
    )
  );
};

export default ProductCard;