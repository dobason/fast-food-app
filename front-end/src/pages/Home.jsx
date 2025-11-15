import React, { useState, useEffect } from 'react'
import { getProducts }  from '../services/productService'
import { useCart } from '../context/cartContext'

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover mb-4" /> 
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold text-green-600 mb-4">{product.price.toLocaleString('vi-VN')} đ</p>
      <button 
        onClick={() => addToCart(product)}
        className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600">
        Thêm vào giỏ 🛒
      </button>
    </div>
  );
}

// Trang Home
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái tải

  useEffect(() => {
    // 1. Component mount, gọi API lấy sản phẩm
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // 3. Nhận data và cập nhật state
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Chạy 1 lần khi component mount

  if (loading) return <p>Đang tải món ăn...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Thực đơn 🍔</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 4. Render danh sách sản phẩm */}
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}