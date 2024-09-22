const inserUserData = require('../modal/inserUserModel');

exports.inserUserCon = async (req, res) => {
  const { name, email, mobile, designation, gender, course, image } = req.body;

  try {
    // Check if the user already exists by email
    const existingEmailUser = await inserUserData.findOne({ email });
    if (existingEmailUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Check if the user already exists by mobile
    const existingMobileUser = await inserUserData.findOne({ mobile });
    if (existingMobileUser) {
      return res.status(409).json({ message: 'User with this mobile number already exists' });
    }

    // Create a new user if they do not exist
    const newUsers = new inserUserData({ name, email, mobile, designation, gender, course, image });
    const savedUser = await newUsers.save();

    console.log('User added:', savedUser);
    res.status(200).json({ message: 'User added successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
