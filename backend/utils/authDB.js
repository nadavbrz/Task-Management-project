const mongoose = require("mongoose");
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected to Data Base`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = 
  connectToMongo

