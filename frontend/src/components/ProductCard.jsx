import React from 'react';

const ProductCard = ({ product }) => {
  const { bottleSize, price, moq, description, deliveryTime } = product;

  return (
    <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-2xl">
      <div className="space-y-4">
        {/* Size Badge */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {bottleSize}
          </span>
          <span className="px-3 py-1 bg-blue-600/20 text-blue-600 rounded-full text-sm font-medium">
            Bottle
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed">
          {description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/20">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Price</p>
            <p className="text-lg font-bold text-blue-600">₹{price}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide">MOQ</p>
            <p className="text-lg font-bold text-cyan-600">{moq}</p>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center text-sm text-gray-700">
          <svg className="w-4 h-4 mr-2 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.447.894l1.006 3.018a1 1 0 001.894 0l1.007-3.018A1 1 0 0011 6v-4z" />
          </svg>
          <span>Delivery: <strong>{deliveryTime} days</strong></span>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
