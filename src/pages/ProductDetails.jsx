import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useCart } from '../context/CartContext'
import { FiStar, FiShoppingCart, FiArrowLeft } from 'react-icons/fi'

const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            setProduct(data)
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = () => {
        addToCart(product, quantity)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <button onClick={() => navigate('/products')} className="btn-primary">
                    Back to Products
                </button>
            </div>
        )
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center space-x-2 text-dark-600 hover:text-gold-600 mb-8 transition-colors"
                >
                    <FiArrowLeft />
                    <span>Back to Products</span>
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-dark-100 rounded-xl overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            {product.featured && (
                                <span className="bg-gold-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Featured
                                </span>
                            )}
                            {product.top_product && (
                                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Top Pick
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`text-lg ${i < Math.floor(product.rating)
                                            ? 'text-gold-500 fill-gold-500'
                                            : 'text-dark-300'
                                            }`}
                                    />
                                ))}
                                <span className="ml-2 text-dark-600">({product.rating})</span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="text-4xl font-bold text-gold-600 mb-6">
                            Rs. {product.price.toLocaleString()}
                        </div>

                        {/* Category */}
                        <div className="mb-6">
                            <span className="text-dark-600">Category: </span>
                            <span className="font-semibold">{product.category}</span>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-3">Description</h2>
                            <p className="text-dark-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.stock === 0 ? (
                                <p className="text-red-600 font-semibold">Out of Stock</p>
                            ) : product.stock < 5 ? (
                                <p className="text-orange-600 font-semibold">Only {product.stock} left in stock!</p>
                            ) : (
                                <p className="text-green-600 font-semibold">In Stock</p>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        {product.stock > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Quantity</label>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center border-2 border-dark-300 rounded-lg hover:bg-dark-100"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-10 h-10 flex items-center justify-center border-2 border-dark-300 rounded-lg hover:bg-dark-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiShoppingCart />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
