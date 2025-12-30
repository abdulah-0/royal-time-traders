import { FiX, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart()

    if (!isCartOpen) return null

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 animate-slide-down">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div className="flex items-center space-x-2">
                            <FiShoppingCart className="text-2xl text-gold-600" />
                            <h2 className="text-2xl font-bold">Shopping Cart</h2>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
                        >
                            <FiX className="text-2xl" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <FiShoppingCart className="text-6xl text-dark-300 mb-4" />
                                <p className="text-xl text-dark-600 mb-2">Your cart is empty</p>
                                <p className="text-dark-500">Add some watches to get started!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex space-x-4 border-b pb-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-dark-900 mb-1">{item.name}</h3>
                                            <p className="text-gold-600 font-bold mb-2">
                                                Rs. {item.price.toLocaleString()}
                                            </p>
                                            <div className="flex items-center space-x-2">
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
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="border-t p-6 space-y-4">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total:</span>
                                <span className="text-gold-600">Rs. {getCartTotal().toLocaleString()}</span>
                            </div>
                            <Link
                                to="/cart"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full btn-outline text-center"
                            >
                                View Cart
                            </Link>
                            <Link
                                to="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full btn-primary text-center"
                            >
                                Checkout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartDrawer
