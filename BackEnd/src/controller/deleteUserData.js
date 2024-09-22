const deleteUserData = require('../modal/inserUserModel');

exports.deleteUserData= async (req, res) => {
    const userId = req.params.id; 
  
    try {
      const deletedEmployee = await deleteUserData.findByIdAndDelete(userId);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };