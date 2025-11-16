const mongoose = require('mongoose');

//Định nghĩa schema người dùng
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'merchant', 'admin'], default: 'user' },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    //Dành cho merchant
    storeName: { type: String, required: function() { return this.role === 'merchant'; } },
    storeDescription: { type: String, required: false },
    storeLocation: { type: String, required: false },
    //Quản lý tài khoản
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

//Hãy chế tạo cỗ máy 'User' dựa trên bản thiết kế userSchema, và ngay lập tức đem nó ra cửa (module.exports) để gửi đi cho các tệp khác dùng
module.exports = mongoose.model('User', userSchema);