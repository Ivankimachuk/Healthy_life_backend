const { User } = require("../models/user");
const { Weight } = require("../models/weightModel");
// const { ctrlWrapper } = require("../helpers");

const updateWeight = async (req, res, next) => {
  const { newValue, token } = req.body;
  const user = await User.findOne({ token });
  //   console.log(user);
  const { _id: owner } = user;
  //   console.log({ owner });

  const currentDate = Date.now();
  const today = new Date(currentDate);
  const todayDate = today.toISOString().slice(0, 10);
  //   console.log(newValue);
  //   console.log(todayDate);
  try {
    const existingWeight = await Weight.findOne({ owner, date: todayDate });
    if (!existingWeight) {
      // Если вес на текущую дату не найден, создаем новую запись
      const newWeight = await Weight.create({
        value: newValue,
        date: todayDate,
        owner,
      });
      res.json({
        status: "success",
        code: 201,
        data: newWeight,
      });
      await User.findByIdAndUpdate(
        owner,
        { value: newWeight },
        { new: true }
      ).exec();
    } else {
      // Если вес на текущую дату найден, обновляем его
      existingWeight.value = newValue;
      await existingWeight.save();
      console.log(existingWeight);

      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          date: todayDate,
          value: existingWeight.value,
        },
      });
    }
    // меняем значение весы в колекции users
    await User.findByIdAndUpdate(
      owner,
      { weight: existingWeight.value },
      { new: true }
    ).exec();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Some problem with updating weight ",
    });
  }
};
module.exports = { updateWeight };

// const addWeight = async (req, res, next) => {
//   const { value, token } = req.body;
//   const user = await User.findOne({ token });
//   console.log(user);

//   const { _id: owner } = user;
//   // console.log(owner)

//   const currentDate = Date.now();
//   const today = new Date(currentDate);
//   const todayDate = today.toISOString().slice(0, 10);

//   const weidht = await Weight.findOne({ owner, date: todayDate });
//   console.log(weidht);

//   if (!weidht) {
//     const result = await Weight.create({ owner, value });
//     return res.json({ message: "success", result });
//   }

//   weidht.value += Number(value);
//   weidht.save();
//   res.json({ message: "success", weidht });
// };

// module.exports = {
//   addWeight: ctrlWrapper(addWeight),
// };
