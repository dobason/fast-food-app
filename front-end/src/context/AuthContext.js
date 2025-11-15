import React, { createContext, useState, useContext, useEffect } from 'react';
import { userApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token')); //getItem để lấy token từ user
    const [loading, setLoading] = useState(true);

    // Dùng để lấy lại thông tin user nếu đã đăng nhập từ trước (tải lại trang)
    useEffect(() => {
        const fetchUserProfile = async () => {
        if (token) {
            try {
            userApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            const response = await userApi.get('/profile'); 
            
            setUser(response.data); 
            } catch (error) {
            console.error("Phiên đăng nhập hết hạn hoặc token không hợp lệ", error);
            // Nếu token hỏng, hãy xóa nó đi
            logout();
            }
        }
        setLoading(false);
        };

        fetchUserProfile();
    }, [token]); // Chỉ chạy lại khi token thay đổi

    const login = async (userToken) => {
        try {
        // Lưu token vào state và localStorage
        setToken(userToken);
        localStorage.setItem('token', userToken);

        // Gắn token vào header cho các request tương lai
        userApi.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        
        // Gọi API /profile ngay sau khi đăng nhập
        const response = await userApi.get('/profile');
        
        // Lưu user object
        setUser(response.data); 
        } catch (error) {
        console.error("Lỗi khi lấy profile sau khi login", error);
        }
    };

    const logout = () => {
        // Xóa mọi thứ
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete userApi.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
        {!loading && children} {/* Chỉ render app khi đã load xong user */}
        </AuthContext.Provider>
    );
};
    //Custome hook để sử dụng context dễ dàng hơn
    export const useAuth = () => useContext(AuthContext);


