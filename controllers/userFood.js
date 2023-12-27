const { HttpError } = require('../helpers/index');

const { ProductIntake } = require('../models/food');
const { updateTotalFood } = require('../helpers/totalFood');
const date = () => {
  const currentDate = Date.now();
  const today = new Date(currentDate);
  return today.toISOString().slice(0, 10);
};

const getAll = async (req, res, next) => {
  try {
    const todayDate = date();
    const { _id: owner } = req.user;
    const result = await ProductIntake.findOne({ owner, date: todayDate });
    if (!result) {
      await ProductIntake.create({ owner });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const saveFoodIntake = async (req, res, next) => {
  try {
    const todayDate = date();
    const { typeFood, userFood } = req.body;
    const { _id: owner } = req.user;

    const food = await ProductIntake.findOne({ owner, date: todayDate });
    
    const userProducts = await ProductIntake.findOne({
      owner,
      date: todayDate,
    });

    userProducts[typeFood].push(...userFood);
    const result = await userProducts.save();

    const allFood = await ProductIntake.findOne({ owner, date: todayDate });
    const { breakfast, dinner, lunch, snack } = allFood;

    const total = updateTotalFood(breakfast, dinner, snack, lunch);
    const updateTotal = await ProductIntake.findOneAndUpdate(
      { owner, date: todayDate },
      total,
      { new: true }
    );
    const resUpdateTotal = await updateTotal.save();
    if (!result && !updateTotal) {
      throw HttpError(404, 'Not found');
    }

    res.json(resUpdateTotal);
  } catch (error) {
    next(error);
  }
};
const deleteFoodIntake = async (req, res) => {
  try {
    const todayDate = date();
    const { _id: owner } = req.user;
    const { typeFood } = req.body;
    const food = await ProductIntake.findOne({ owner, date: todayDate });
    if (food === null || food[typeFood] === null) {
      res.status(404).json({ message: `Not found any food` });
    }
    food[typeFood] = [];
    const result = await food.save();

    if (!result) {
      return res.status(500).json({ message: `Internal server Error` });
    }

    const allFood = await ProductIntake.findOne({ owner, date: todayDate });
    if (allFood === null) {
      res.status(404).json({ message: `Not found any food` });
    }

    const { breakfast, dinner, lunch, snack } = allFood;

    const total = updateTotalFood(breakfast, dinner, snack, lunch);
    const updateTotal = await ProductIntake.findOneAndUpdate(
      { owner, date: todayDate },
      total,
      { new: true }
    );
    const resultTotal = await updateTotal.save();

    res.status(200).json({ message: 'Food deleted success', resultTotal });
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error' });
  }
};

const updateFoodIntake = async (req, res) => {
  try {
    const todayDate = date();
    const { id } = req.params;

    const { typeFood, userFood } = req.body;
    const { _id: owner } = req.user;

    const food = await ProductIntake.findOne(
      { [`${typeFood}`]: { $elemMatch: { _id: id } } },
      [`${typeFood}`]
    );
    function selectType() {
      if (typeFood === 'breakfast') {
        const arr = food.lunch.map((item) => {
          if (item._id.toString() === id) {
            item.name = userFood.name;
            item.nutrition = userFood.nutrition;
            item.calories = userFood.calories;
          }
          return item;
        });
        food.breakfast = [...arr];
        return arr;
      }
      if (typeFood === 'lunch') {
        const arr = food.lunch.map((item) => {
          if (item._id.toString() === id) {
            item.name = userFood.name;
            item.nutrition = userFood.nutrition;
            item.calories = userFood.calories;
          }
          return item;
        });
        food.lunch = [...arr];
        return arr;
      }
      if (typeFood === 'dinner') {
        const arr = food.lunch.map((item) => {
          if (item._id.toString() === id) {
            item.name = userFood.name;
            item.nutrition = userFood.nutrition;
            item.calories = userFood.calories;
          }
          return item;
        });
        food.dinner = [...arr];
        return arr;
      }
      if (typeFood === 'snack') {
        const arr = food.lunch.map((item) => {
          if (item._id.toString() === id) {
            item.name = userFood.name;
            item.nutrition = userFood.nutrition;
            item.calories = userFood.calories;
          }
          food.snack = [...arr];
          return item;
        });
        return arr;
      }
    }
    selectType();

    const result = await food.save();

    const allFood = await ProductIntake.findOne({ owner, date: todayDate });
    const { breakfast, dinner, lunch, snack } = allFood;

    const total = updateTotalFood(breakfast, dinner, snack, lunch);
    const updateTotal = await ProductIntake.findOneAndUpdate(
      { owner, date: todayDate },
      total,
      { new: true }
    );

    if (!result && !updateTotal) {
      throw HttpError(404, 'Not found');
    }
    res.json(updateTotal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateFoodIntake,
  deleteFoodIntake,
  saveFoodIntake,
  getAll,
};
