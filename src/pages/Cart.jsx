import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FiTrash2, FiShoppingCart } from 'react-icons/fi'

const Cart = () => {
    const navigate = useNavigate()
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

    if (cart.length === 0) {
        return (
            <div className="container-custom py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <FiShoppingCart className="text-6xl text-dark-300 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-dark-600 mb-8">
                        Looks like you haven't added any watches to your cart yet.
                    </p>
                    <Link to="/products" className="btn-primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                <h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="card p-6">
                                <div className="flex gap-6">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                        <p className="text-dark-600 mb-4">{item.category}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-dark-300 rounded hover:bg-dark-100"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-dark-300 rounded hover:bg-dark-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gold-600">
                                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-dark-500">
                                                    Rs. {item.price.toLocaleString()} each
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <FiTrash2 className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-dark-700">
                                    <span>Subtotal</span>
                                    <span>Rs. {getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-dark-700">
                                    <span>Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-gold-600">Rs. {getCartTotal().toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn-primary w-full mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/products"
                                className="btn-outline w-full block text-center"
                            >
                                Continue Shopping
                            </Link>

                            <button
                                onClick={clearCart}
                                className="w-full mt-4 text-red-600 hover:text-red-700 text-sm"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
