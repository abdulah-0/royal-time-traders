import { Link } from 'react-router-dom'
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartDrawer from './CartDrawer'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { getCartCount, setIsCartOpen } = useCart()
    const { user, signOut, isAdmin } = useAuth()

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <>
            <nav className="bg-dark-900 text-white shadow-lg sticky top-0 z-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl md:text-3xl font-serif font-bold text-gradient">
                                Royal Time Traders
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="hover:text-gold-400 transition-colors">
                                Home
                            </Link>
                            <Link to="/products" className="hover:text-gold-400 transition-colors">
                                Products
                            </Link>
                            <Link to="/about" className="hover:text-gold-400 transition-colors">
                                About
                            </Link>
                            {isAdmin() && (
                                <Link to="/admin" className="hover:text-gold-400 transition-colors">
                                    Admin
                                </Link>
                            )}
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Cart Icon */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 hover:text-gold-400 transition-colors"
                            >
                                <FiShoppingCart className="text-2xl" />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            {user ? (
                                <div className="hidden md:flex items-center space-x-4">
                                    <span className="text-sm text-gold-400">{user.email}</span>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-sm hover:text-gold-400 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="hidden md:flex items-center space-x-1 hover:text-gold-400 transition-colors"
                                >
                                    <FiUser className="text-xl" />
                                    <span>Login</span>
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2"
                            >
                                {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-dark-700 animate-slide-down">
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/"
                                    className="hover:text-gold-400 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/products"
                                    className="hover:text-gold-400 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/about"
                                    className="hover:text-gold-400 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                                {isAdmin() && (
                                    <Link
                                        to="/admin"
                                        className="hover:text-gold-400 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Admin
                                    </Link>
                                )}
                                {user ? (
                                    <>
                                        <span className="text-sm text-gold-400">{user.email}</span>
                                        <button
                                            onClick={() => {
                                                handleSignOut()
                                                setIsMenuOpen(false)
                                            }}
                                            className="text-left hover:text-gold-400 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="hover:text-gold-400 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <CartDrawer />
        </>
    )
}

export default Navbar
