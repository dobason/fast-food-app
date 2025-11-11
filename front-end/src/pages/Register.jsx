import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userApi.post('/register', formData); //Gửi request đăng ký
            if (response.status === 201) {
                navigate('/login'); //Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
            }
        } catch(error) {
            console.error('Lỗi đăng ký: ', error);
        }
    };


    return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Tên</label>
          <input type="text" name="name" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mật khẩu</label>
          <input type="password" name="password" onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Đăng Ký
        </button>
      </form>
    </div>
  );    
}