import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    // const [formData, setFormData] = useState({ name: '', password: ''});
    const { login } = useAuth();
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await userApi.post('/login', formData); //Gửi request đăng nhập
            const { token } = response.data;
            await login(token); // Cập nhật AuthContext với token và user profile
            navigate('/');
        } catch (error) {
            console.error('Lỗi đăng nhập: ', error);
        }
    };

    return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input type="password" name="password" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};