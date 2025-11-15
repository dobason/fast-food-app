import React from 'react';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
  const { cartItems } = useCart();
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // kiểm tra xem user đã đăng nhập chưa
    if (!user) {
        alert('Vui lòng đăng nhập để tiếp tục đặt hàng.');
        navigate('/login');
        return;
    }

    // Chuẩn bị data cho Order Service
    const orderData = {
      // Bạn cần lấy userId từ AuthContext (ví dụ: user._id)
      userId: user._id, 
      items: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      // 2. Gọi API tạo đơn hàng
      const result = await createOrder(orderData);

      // 7. Nhận kết quả cuối cùng từ Order Service
      console.log('Đơn hàng đã được xử lý:', result);

      if (result.order.status === 'paid') {
        alert('Đặt hàng và thanh toán thành công!');
        // (clearCart() nên được gọi ở đây)
        navigate('/order-history');
      } else {
        alert('Thanh toán thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi đặt hàng.');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Xác nhận Đơn hàng</h2>
      {/* Liệt kê các sản phẩm trong giỏ hàng... */}
      <div className="text-xl font-bold my-4">
        Tổng cộng: {total.toLocaleString('vi-VN')} đ
      </div>
      <button 
        onClick={handleCheckout}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
        Xác nhận Thanh toán
      </button>
    </div>
  );
}