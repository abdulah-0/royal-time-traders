import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import ProductCard from '../components/ProductCard'
import { FiSearch } from 'react-icons/fi'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('category')

            if (error) throw error

            const uniqueCategories = [...new Set(data.map(item => item.category))]
            setCategories(uniqueCategories)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Collection</h1>
                    <p className="text-xl text-dark-600">
                        Discover the perfect timepiece for your collection
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search watches..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-12"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${selectedCategory === 'all'
                                    ? 'bg-gold-600 text-white'
                                    : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                                }`}
                        >
                            All
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${selectedCategory === category
                                        ? 'bg-gold-600 text-white'
                                        : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="h-64 bg-dark-200"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-dark-200 rounded"></div>
                                    <div className="h-4 bg-dark-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-2xl text-dark-600">No products found</p>
                        <p className="text-dark-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
