const mongoose = require('mongoose');
const { Schema } = mongoose;

//Định nghĩa schema sản phẩm
// Product Schema
const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        parse: true
    },
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc']
    },
    description:{
        type: String,
        default: ''
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
        index: true
    },
    images: [String]
}, {
    timestamps: true
});

//Hãy chế tạo cỗ máy 'Product' dựa trên bản thiết kế productSchema, và ngay lập tức đem nó ra cửa (module.exports) để gửi đi cho các tệp khác dùng
module.exports = mongoose.model('Product', productSchema);
