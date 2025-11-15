import { productApi } from "./api";

export const getProducts = async () => {
    try {
        const response = await productApi.get('/');
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        throw error;
    }
}