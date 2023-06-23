const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const MONGO_URL = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.MONGO_PASSWORD 
);

const mongoCreateConnection = mongoose.createConnection(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection reday!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("strictQuery", false);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
  mongoCreateConnection,
};
