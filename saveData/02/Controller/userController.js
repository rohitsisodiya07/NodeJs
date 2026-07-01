const userModel = require("../Model/userModel");
const user = require("../Model/userModel");

exports.signUp = async (req, res) => {
  console.log(">>>>>>>>", req.body);

  const saveData = new userModel(req.body);
  const result = await saveData.save();
  res.status(200).json(result);
};
