const Delivery = require('../models/Delivery');

// Tạo một đơn giao hàng mới
exports.createDelivery = async (req, res) => {
    try {
        const { droneId, orderId, dest_lat, dest_lng, start_lat, start_lng } = req.body;

        //Kiểm tra dữ liệu đầu vào
        if (!droneId || !orderId || !dest_lat || !dest_lng || !start_lat || !start_lng) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newDelivery = new Delivery({
            droneId,
            orderId,
            dest_lat,
            dest_lng,
            start_lat,
            start_lng
        });

        const savedDelivery = await newDelivery.save();
        res.status(201).json(savedDelivery);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Lấy tat ca thông tin đơn giao hàng
exports.getAllDeliveries = async (req, res) => {
    try{
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Lấy thông tin đơn giao hàng theo ID
exports.getDeliveryById = async (req, res) => {
    try {
        const deliveryId = await Delivery.findById(req.params.id);
        if (!deliveryId) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json(deliveryId);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Cập nhật trạng thái đơn giao hàng
exports.updateDelivery = async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Trả về dữ liệu mới
        );

        if (!updatedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        res.status(200).json(updatedDelivery);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Xóa đơn giao hàng
exports.deleteDelivery = async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);

        if (!deletedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        res.status(200).json({ message: 'Đã xóa chuyến giao hàng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};