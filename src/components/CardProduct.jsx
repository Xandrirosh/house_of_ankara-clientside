import { useState } from 'react';
import { Link } from 'react-router-dom';

import DisplayPriceKSH from '../utils/DisplayPriceKSH';
import priceWithDiscount from '../utils/priceWithDiscount';


const CardProduct = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const hasDiscount = Boolean(data.discount);
  const isOutOfStock = data.stock === 0;
  const finalPrice = DisplayPriceKSH(priceWithDiscount(data.price, data.discount));
  const url = `/product/${data._id}`;

  return (
    <Link
      to={url}
      className="border py-1 lg:p-4 grid gap-1 lg:gap-3 min-w-32 max-w-36 lg:max-w-52 lg:min-w-52 rounded bg-white"
    >
      {/* Product Image */}
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>

      {/* Product Name */}
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>

      {/*Discount */}
      <div className="flex items-center gap-2 px-2 lg:px-0 text-sm lg:text-base">
        {hasDiscount && (
          <span className="text-green-500 bg-green-100 px-1 rounded text-sm">
            {data.discount}% off
          </span>
        )}
      </div>

      {/* Price & Stock Status */}
      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="font-semibold">{finalPrice}</div>
        <div>
          {isOutOfStock ? (
            <p className="text-red-600 font-semibold text-sm text-center">Out of Stock</p>
          ) : (
            // <AddToCartButton data={data} />
            null
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
