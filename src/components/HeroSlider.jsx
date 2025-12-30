import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
    {
        id: 1,
        title: 'Timeless Elegance',
        subtitle: 'Discover Our Luxury Collection',
        description: 'Premium watches crafted for the discerning collector',
        cta: 'Shop Now',
        bgGradient: 'from-dark-900 via-dark-800 to-gold-900'
    },
    {
        id: 2,
        title: 'Precision Meets Style',
        subtitle: 'Swiss Craftsmanship',
        description: 'Experience the perfect blend of form and function',
        cta: 'Explore Collection',
        bgGradient: 'from-gold-900 via-primary-800 to-dark-900'
    },
    {
        id: 3,
        title: 'Limited Edition',
        subtitle: 'Exclusive Timepieces',
        description: 'Own a piece of horological history',
        cta: 'View Exclusives',
        bgGradient: 'from-dark-900 via-primary-900 to-gold-900'
    }
]

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className={`h-full bg-gradient-to-r ${slide.bgGradient} flex items-center`}>
                        <div className="container-custom">
                            <div className="max-w-2xl text-white animate-slide-up">
                                <p className="text-gold-400 text-lg mb-2 font-semibold">
                                    {slide.subtitle}
                                </p>
                                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-8 text-dark-100">
                                    {slide.description}
                                </p>
                                <Link
                                    to="/products"
                                    className="inline-block btn-primary text-lg"
                                >
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-gold-500 w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default HeroSlider
