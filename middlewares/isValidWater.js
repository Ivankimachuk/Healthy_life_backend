const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidIdWater = (req, res, next) => {
  const { _id } = req.body;
  if (!isValidObjectId(_id)) {
    next(HttpError(400, `${_id} is not valid id`));
  }
  next();
};

module.exports = isValidIdWater;
