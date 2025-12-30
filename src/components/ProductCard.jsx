import { Link } from 'react-router-dom'
import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
    const { addToCart } = useCart()

    const handleAddToCart = (e) => {
        e.preventDefault()
        addToCart(product)
    }

    return (
        <Link to={`/products/${product.id}`} className="group">
            <div className="card group-hover:scale-105 transition-transform duration-300">
                {/* Product Image */}
                <div className="relative h-64 bg-dark-100 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.featured && (
                        <span className="absolute top-4 left-4 bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                        </span>
                    )}
                    {product.top_product && (
                        <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Top Pick
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-dark-900 mb-2 line-clamp-1">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    className={`text-sm ${i < Math.floor(product.rating)
                                        ? 'text-gold-500 fill-gold-500'
                                        : 'text-dark-300'
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-dark-600">({product.rating})</span>
                        </div>
                    )}

                    <p className="text-dark-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gold-600">
                            Rs. {product.price.toLocaleString()}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-dark-900 text-white p-3 rounded-lg hover:bg-gold-600 transition-colors"
                            disabled={product.stock === 0}
                        >
                            <FiShoppingCart className="text-lg" />
                        </button>
                    </div>

                    {product.stock === 0 && (
                        <p className="text-red-600 text-sm mt-2 font-semibold">Out of Stock</p>
                    )}
                    {product.stock > 0 && product.stock < 5 && (
                        <p className="text-orange-600 text-sm mt-2">Only {product.stock} left!</p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
