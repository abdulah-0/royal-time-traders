import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import ProductCard from './ProductCard'

const FeaturedProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturedProducts()
    }, [])

    const fetchFeaturedProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('featured', true)
                .limit(4)

            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error('Error fetching featured products:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="section-title">Featured Watches</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="card animate-pulse">
                                <div className="h-64 bg-dark-200"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-dark-200 rounded"></div>
                                    <div className="h-4 bg-dark-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (products.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                <h2 className="section-title">Featured Watches</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts
