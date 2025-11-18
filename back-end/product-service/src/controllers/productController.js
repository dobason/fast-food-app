const Product = require('../models/Product'); //Mongoose model sản phẩm

//Tạo sản phẩm mới
exports.createProduct = async (req, res) => {
    try {
        const { name, images, description, price, quantity, category } = req.body;
        
        const newProduct = new Product({
            name,
            images,
            description,
            price,
            quantity,
            category
        });

        await newProduct.save(); //Lưu sản phẩm vào DB
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
        // Phải có error.message ở đây
        res.status(500).json({ message: 'Server error', error: error.message }); 
    }
};

//Lấy tất cả sản phẩm
exports.getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.statusq(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Câp nhật sản phẩm
exports.updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

//Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deleteProduct){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) { 
        res.status(500).json({ message: 'Server error' });
    }
}