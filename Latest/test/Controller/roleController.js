// const formModel = require("../Model/roleWiseModel");

// const addForm = async (req, res) => {
//   try {
//     const result = await formModel.create({
//       ...req.body,
//       userId: req.user._id,
//     });
//     console.log(">>>>>result", result);

//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// const getMyForm = async (req, res) => {
//   try {
//     const result = await formModel.find({
//       userId: req.user._id,
//     });

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   addForm,
//   getMyForm,
// };
