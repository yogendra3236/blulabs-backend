const mongoose = require("mongoose");
require("dotenv").config();

// replace mongoose promise with node-native promise
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL, {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected!`))
  .catch((err) =>
    console.log(`Some error occurred in MongoDB connection: ${err}`),
  );
