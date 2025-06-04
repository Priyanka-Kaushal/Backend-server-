const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || (() => {
  const isDocker = process.env.IS_DOCKER === 'true';
  const mongoHost = isDocker ? 'mongo' : 'localhost';
  return `mongodb://${mongoHost}:27017/Shonaz`;
})();

console.log('🔌 Connecting to Mongo URI:', mongoUri);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected at ${mongoUri}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
