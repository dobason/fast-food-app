import { orderApi } from '../api/orderApi';

// Data gửi lên backend cần userId và mảng items
export const createOrder = async (orderData) => {
    try{
        const response = await orderApi.post('/', orderData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng: ', error);
        throw error;
    }
};