const { WaterIntake } = require("../models/waterIntakeSchema");

const currentDate = Date.now();
const today = new Date(currentDate);
const todayDate = today.toISOString().slice(0, 10)

const getWaterIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const waterIntakeRecord = await WaterIntake.findOne({ owner: userId, date: todayDate });
    res.status(200).json({ status: "success", waterIntakeRecord });
  } catch (error) {
    res.status(500).json({ message: "Failed to get water intake for date" });
  }
};

const addWaterIntake = async (req, res, next) => {
  try {
    const { value } = req.body; 
    const { _id: owner } = req.user;    
    
    const water = await WaterIntake.findOne({ owner, date: todayDate });  

    if (!water) {
      const water = await WaterIntake.create({ owner, value });
      return res.json({ message: "success", water });
    }

    water.value += Number(value);
    water.save();
    res.json({ message: "success", water });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add water intake" });
  }
};

const deleteByIdWater = async (req, res) => {
  try {
    const { _id } = req.body;
    const ownerId = req.user._id;

    const waterRecord = await WaterIntake.findOne({ _id });

    if (!waterRecord) {
      return res.status(404).json({ message: "No water intake record found" });
    }

    if (String(waterRecord.owner) !== String(ownerId)) {
      return res.status(403).json({ message: "Unauthorized to delete this record" });
    }
  

    const result = await WaterIntake.findOneAndDelete({ _id });

    if (!result) {
      return res
        .status(404)
        .json({ message: "No water intake record found for today" });
    }

    res
      .status(200)
      .json({ message: "Water intake record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete water intake" });
  }
};

module.exports = {
  getWaterIntake,
  addWaterIntake,
  deleteByIdWater,
};
