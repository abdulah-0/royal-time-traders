import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi'

const Admin = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        rating: '',
        stock: '',
        featured: false,
        top_product: false,
        image: ''
    })

    useEffect(() => {
        fetchProducts()
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            rating: formData.rating ? parseFloat(formData.rating) : null,
            stock: parseInt(formData.stock)
        }

        try {
            if (editingProduct) {
                // Update existing product
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editingProduct.id)

                if (error) throw error
            } else {
                // Create new product
                const { error } = await supabase
                    .from('products')
                    .insert([productData])

                if (error) throw error
            }

            fetchProducts()
            closeModal()
        } catch (error) {
            console.error('Error saving product:', error)
            alert('Failed to save product')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchProducts()
        } catch (error) {
            console.error('Error deleting product:', error)
            alert('Failed to delete product')
        }
    }

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product)
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                rating: product.rating || '',
                stock: product.stock,
                featured: product.featured,
                top_product: product.top_product,
                image: product.image
            })
        } else {
            setEditingProduct(null)
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                rating: '',
                stock: '',
                featured: false,
                top_product: false,
                image: ''
            })
        }
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingProduct(null)
    }

    return (
        <div className="py-16">
            <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
                    <button onClick={() => openModal()} className="btn-primary flex items-center space-x-2">
                        <FiPlus />
                        <span>Add Product</span>
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
                    </div>
                ) : (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-dark-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-100">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-dark-50">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold">{product.name}</div>
                                                <div className="text-sm text-dark-600 line-clamp-1">
                                                    {product.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4 font-semibold text-gold-600">
                                                Rs. {product.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={product.stock === 0 ? 'text-red-600' : ''}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-1">
                                                    {product.featured && (
                                                        <span className="bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded">
                                                            Featured
                                                        </span>
                                                    )}
                                                    {product.top_product && (
                                                        <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                                                            Top
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openModal(product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                    >
                                                        <FiEdit2 />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-2xl font-bold">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-dark-100 rounded">
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Product Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        className="input-field"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Price *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            step="0.01"
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Stock *</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Category *</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Rating (Optional)</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Image URL *</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="flex gap-6">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={formData.featured}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-gold-600 rounded"
                                        />
                                        <span className="font-semibold">Featured Product</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="top_product"
                                            checked={formData.top_product}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-gold-600 rounded"
                                        />
                                        <span className="font-semibold">Top Product</span>
                                    </label>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="btn-primary flex-1">
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                    <button type="button" onClick={closeModal} className="btn-outline flex-1">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin
