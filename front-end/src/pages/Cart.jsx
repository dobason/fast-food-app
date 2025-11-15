import React from 'react';
import { useCart } from '../context/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

export default function Cart() {
  // 1. Lấy state và các hàm từ CartContext
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // 2. Tính tổng tiền
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 3. Hàm xử lý khi nhấn "Tiến hành Đặt hàng"
  const handleCheckout = () => {
    // Chỉ cần điều hướng đến trang checkout
    navigate('/checkout'); 
  };

  // 4. Xử lý khi giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto mt-10 p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Giỏ hàng của bạn</h1>
        <p className="text-xl text-gray-600 mb-6">Giỏ hàng của bạn đang trống.</p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 text-lg"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // 5. Giao diện khi giỏ hàng có sản phẩm
  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      
      {/* Container chính: chia 2 cột trên màn hình lớn */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cột trái: Danh sách sản phẩm (chiếm 2/3) */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-xl font-semibold">Sản phẩm</h2>
              <button 
                onClick={clearCart} 
                className="text-red-500 hover:text-red-700"
              >
                Xóa tất cả
              </button>
            </div>
            
            {/* 6. Lặp qua các sản phẩm trong giỏ hàng */}
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item._id} className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Hình ảnh và Tên */}
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    {/* <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover"/> */}
                    <div className="w-20 h-20 rounded-md bg-gray-200 flex-shrink-0"></div> {/* Ảnh dummy */}
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price.toLocaleString('vi-VN')} đ</p>
                    </div>
                  </div>

                  {/* Cập nhật số lượng */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-lg font-semibold w-10 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* Giá tổng và nút Xóa */}
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold w-24 text-right">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </span>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải: Tóm tắt đơn hàng (chiếm 1/3) */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-20">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Tạm tính</span>
                <span>{total.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Tổng cộng</span>
              <span>{total.toLocaleString('vi-VN')} đ</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white text-lg font-semibold py-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Tiến hành Đặt hàng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}