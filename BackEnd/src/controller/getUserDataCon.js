const inserUserData = require('../modal/inserUserModel');

exports.getUserDataCon =async (req, res) => {
    try {
      const employees = await inserUserData .find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };