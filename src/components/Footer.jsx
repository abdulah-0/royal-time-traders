import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
    return (
        <footer className="bg-dark-900 text-white mt-16">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-serif font-bold text-gradient mb-4">
                            Royal Time Traders
                        </h3>
                        <p className="text-dark-300 mb-4">
                            Your premier destination for luxury timepieces. We curate the finest watches
                            from around the world, bringing timeless elegance to your wrist.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-dark-300 hover:text-gold-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-dark-300 hover:text-gold-400 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-dark-300 hover:text-gold-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-dark-300 hover:text-gold-400 transition-colors">
                                    Shopping Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-2 text-dark-300">
                                <FiMail className="text-gold-400" />
                                <span>royaltimetraders@gmail.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-dark-300">
                                <FiPhone className="text-gold-400" />
                                <span>03447224448</span>
                            </li>
                            <li className="flex items-center space-x-2 text-dark-300">
                                <FiMapPin className="text-gold-400" />
                                <span>18, Mobile Arena, SOAN Garden, Islamabad</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-400">
                    <p>&copy; {new Date().getFullYear()} Royal Time Traders. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
