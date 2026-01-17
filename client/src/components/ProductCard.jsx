import { Package } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 card-hover">
      <div className="flex justify-center mb-4">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.size} className="h-40 object-contain" />
        ) : (
          <Package className="h-40 w-40 text-secondary-400" />
        )}
      </div>
      <h3 className="text-xl font-bold text-center text-primary-600 mb-2">
        {product.size} Bottle
      </h3>
      {product.priceRange && (
        <p className="text-center text-gray-600 mb-2">
          <span className="font-semibold">Price Range:</span> {product.priceRange}
        </p>
      )}
      <p className="text-center text-gray-600 mb-2">
        <span className="font-semibold">MOQ:</span> {product.MOQ} bottles
      </p>
      {product.deliveryTime && (
        <p className="text-center text-gray-600 mb-4">
          <span className="font-semibold">Delivery:</span> {product.deliveryTime}
        </p>
      )}
      {product.description && (
        <p className="text-sm text-gray-500 text-center">{product.description}</p>
      )}
    </div>
  );
};

export default ProductCard;
