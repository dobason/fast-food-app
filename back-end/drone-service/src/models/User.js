const mongoose = require('mongoose');
const { Schema } = mongoose;

//Định nghĩa schema người dùng
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'merchant', 'admin'],
        default: 'user'
    },
    phone: String,
    address: String,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

//Hãy chế tạo cỗ máy 'User' dựa trên bản thiết kế userSchema, và ngay lập tức đem nó ra cửa (module.exports) để gửi đi cho các tệp khác dùng
module.exports = mongoose.model('User', userSchema);
