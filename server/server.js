const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
const { mongoConnect } = require("./utils/mongoConnect");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(port, () => {
    console.log(`server run on port ${port}`);
  });
}

startServer();

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION! Shutting down...");
//   console.log(err.name, err.message);
//   // server.close(() => {
//   //   process.exit(1);
//   // });
// });


