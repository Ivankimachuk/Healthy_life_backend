const { User } = require("../models/user");
const { WaterIntake } = require("../models/waterIntakeSchema");

const getWaterIntake = async (req, res) => {
  try {
    console.log("get");
    const userId = req.user.id;
    const waterIntakeRecord = await WaterIntake.find({ owner: userId });
    console.log(waterIntakeRecord);

    res.status(200).json({ status: "success", waterIntakeRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get water intake for date" });
  }
};

const addWaterIntake = async (req, res, next) => {
  try {
    const { value } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    const { _id: owner } = user;
    const currentDate = Date.now();
    const today = new Date(currentDate);
    const todayDate = today.toISOString().slice(0, 10);

    const water = await WaterIntake.findOne({ owner, date: todayDate });
    console.log(water);

    if (!water) {
      const result = await WaterIntake.create({ owner, value });
      return res.json({ message: "success", result });
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
