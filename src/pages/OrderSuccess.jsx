import { useLocation, Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import { format } from 'date-fns'

const OrderSuccess = () => {
    const location = useLocation()
    const order = location.state?.order

    if (!order) {
        return (
            <div className="container-custom py-16 text-center">
                <h2 className="text-2xl font-bold mb-4">Order not found</h2>
                <Link to="/" className="btn-primary">
                    Return to Home
                </Link>
            </div>
        )
    }

    return (
        <div className="py-16">
            <div className="container-custom max-w-3xl">
                <div className="card p-8 text-center">
                    <FiCheckCircle className="text-6xl text-green-600 mx-auto mb-6" />

                    <h1 className="text-4xl font-serif font-bold mb-4">Order Placed Successfully!</h1>

                    <p className="text-xl text-dark-600 mb-8">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>

                    <div className="bg-dark-50 rounded-lg p-6 mb-8 text-left">
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-dark-600">Order ID:</span>
                                <span className="font-semibold">{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Order Date:</span>
                                <span className="font-semibold">
                                    {format(new Date(order.created_at), 'PPP')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Status:</span>
                                <span className="font-semibold capitalize bg-gold-100 text-gold-800 px-3 py-1 rounded">
                                    {order.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Payment Method:</span>
                                <span className="font-semibold">Cash on Delivery</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-3">
                                <span>Total:</span>
                                <span className="text-gold-600">Rs. {order.total_price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
                        <h3 className="font-bold mb-2">What's Next?</h3>
                        <ul className="space-y-2 text-dark-700">
                            <li>• You will receive an order confirmation email shortly</li>
                            <li>• We'll notify you when your order ships</li>
                            <li>• Prepare the exact amount for cash on delivery</li>
                            <li>• Expected delivery: 3-5 business days</li>
                        </ul>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Link to="/" className="btn-primary">
                            Continue Shopping
                        </Link>
                        <Link to="/products" className="btn-outline">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
