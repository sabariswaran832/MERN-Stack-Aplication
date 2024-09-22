const updateUserData = require('../modal/inserUserModel');


exports.updateUserDataCon = async (req, res) => {
  const employeeId = req.params.id;
  const updatedData = req.body;

  try {
    // Find the employee by ID and update with the new data
    const updatedEmployee = await updateUserData.findByIdAndUpdate(employeeId, updatedData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Respond with the updated employee data
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
};


