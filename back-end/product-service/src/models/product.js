const mongoose = require('mongoose');

//Định nghĩa schema sản phẩm
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String}]
})

//Hãy chế tạo cỗ máy 'Product' dựa trên bản thiết kế productSchema, và ngay lập tức đem nó ra cửa (module.exports) để gửi đi cho các tệp khác dùng
module.exports = mongoose.model('Product', productSchema);