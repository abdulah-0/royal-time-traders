import HeroSlider from '../components/HeroSlider'
import FeaturedProducts from '../components/FeaturedProducts'
import TopProducts from '../components/TopProducts'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <HeroSlider />

            {/* Featured Products */}
            <FeaturedProducts />

            {/* Top Products */}
            <TopProducts />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-dark-900 to-gold-900 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        Find Your Perfect Timepiece
                    </h2>
                    <p className="text-xl mb-8 text-dark-100 max-w-2xl mx-auto">
                        Explore our complete collection of luxury watches from the world's finest brands
                    </p>
                    <Link to="/products" className="btn-primary text-lg">
                        Browse All Watches
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home
