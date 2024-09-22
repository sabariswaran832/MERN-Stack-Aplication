const mongoose = require('mongoose');

// Function to generate a unique six-digit ID
const generateUniqueSixDigitId = async (model) => {
  let uniqueId;
  do {
    uniqueId = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit ID
  } while (await model.findOne({ uniqueId })); // Check for uniqueness in the database
  return uniqueId;
}

const employeeSchema = new mongoose.Schema({
  uniqueId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  image: { type: String, required: true }
}, { timestamps: true }); // Enable timestamps

// Middleware to set unique ID before saving
employeeSchema.pre('save', async function (next) {
  if (!this.uniqueId) {
    this.uniqueId = await generateUniqueSixDigitId(mongoose.model('Employee_Details', employeeSchema));
  }
  next();
});

module.exports = mongoose.model('Employee_Details', employeeSchema);
