const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const { mongoConnect } = require("./utils/mongoConnect");

const port = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(port, () => {
    console.log(`server run on port ${port}`);
  });
}

startServer();

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


