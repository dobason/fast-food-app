const Drone = require('../models/Drone');

// Tạo một drone mới
exports.createDrone = async (req, res) => {
    try {
        const { 
            droneId, 
            battery, 
            current_lat, 
            current_lng, 
            store_lat, 
            store_lng, 
            max_payload_kg, 
            max_range_km, 
            status
        } = req.body;

        //Kiểm tra droneId đã tồn tại chưa
        const droneExists = await Drone.findOne({ droneId });
        if (droneExists) {
            return res.status(400).json({ message: 'Drone ID đã tồn tại' });
        }   

        const newDrone = new Drone({
            droneId,
            battery,
            current_lat,
            current_lng,
            store_lat,
            store_lng,
            max_payload_kg,
            max_range_km,
            status
        });

        const savedDrone = await newDrone.save();
        res.status(201).json(savedDrone);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Lấy danh sách tất cả drone
exports.getAllDrones = async (req, res) => {
    try {
        const drones = await Drone.find();
        res.status(200).json(drones);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Lấy thông tin một drone theo ID
exports.getDroneById = async (req, res) => {
  try {
    const drone = await Drone.findById(req.params.id);
    if (!drone) {
      return res.status(404).json({ message: 'Không tìm thấy Drone' });
    }
    res.status(200).json(drone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin drone
exports.updateDrone = async (req, res) => {
    try{
        const updatedDrone = await Drone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedDrone) {
            return res.status(404).json({ message: 'Không tìm thấy Drone' });
        }
        res.status(200).json(updatedDrone);
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Xoá một drone
exports.deleteDrone = async (req, res) => {
    try{
        const deletedDrone = await Drone.findByIdAndDelete(req.params.id);

        if (!deletedDrone) {
            return res.status(404).json({ message: 'Không tìm thấy Drone' });
        }

        res.status(200).json({ message: 'Drone đã được xoá thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
