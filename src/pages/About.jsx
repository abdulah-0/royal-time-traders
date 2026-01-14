const About = () => {
    return (
        <div className="py-16">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Royal Time Traders</h1>
                    <p className="text-xl text-dark-600 max-w-3xl mx-auto">
                        Your trusted destination for luxury timepieces since our inception
                    </p>
                </div>

                {/* Brand Story */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
                        <p className="text-dark-700 mb-4">
                            Royal Time Traders was founded with a singular vision: to bring the world's finest
                            timepieces to discerning collectors and enthusiasts. Our passion for horology drives
                            us to curate an exceptional collection of watches that represent the pinnacle of
                            craftsmanship and design.
                        </p>
                        <p className="text-dark-700">
                            Each watch in our collection is carefully selected for its quality, heritage, and
                            timeless appeal. We believe that a watch is more than just a timekeeping device—it's
                            a statement of style, a work of art, and an investment in excellence.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gold-100 to-primary-100 rounded-xl p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl font-serif font-bold text-gold-600 mb-2">10+</div>
                            <p className="text-xl text-dark-700">Years of Excellence</p>
                        </div>
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-dark-900 text-white rounded-xl p-12 mb-16">
                    <h2 className="text-3xl font-serif font-bold mb-6 text-center">Our Mission</h2>
                    <p className="text-xl text-center max-w-4xl mx-auto text-dark-100">
                        To provide our customers with an unparalleled shopping experience, offering authentic
                        luxury timepieces, expert guidance, and exceptional service. We are committed to
                        building lasting relationships with our clients based on trust, integrity, and a
                        shared appreciation for fine watchmaking.
                    </p>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">✓</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                        <p className="text-dark-600">
                            Every watch is guaranteed authentic and comes with proper documentation
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">★</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Quality</h3>
                        <p className="text-dark-600">
                            We curate only the finest timepieces from renowned manufacturers
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl text-white">♥</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Service</h3>
                        <p className="text-dark-600">
                            Exceptional customer service and expert guidance every step of the way
                        </p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-dark-50 rounded-xl p-8">
                    <h2 className="text-3xl font-serif font-bold mb-6 text-center">Get In Touch</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="font-bold mb-2">Email</h3>
                            <p className="text-dark-600">royaltimetraders@gmail.com</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Phone</h3>
                            <p className="text-dark-600">03447224448</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Location</h3>
                            <p className="text-dark-600">18, Mobile Arena, SOAN Garden, Islamabad</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
