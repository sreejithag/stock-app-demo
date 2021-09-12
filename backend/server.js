const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

//define the env variables
const port = process.env.PORT;
// const databse_host = process.env.HOST;
// const password = process.env.DATABASE_PASSWORD;
// const databse = process.env.DATABASE;
// const user = process.env.USER;

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

app.listen(port, () => {
  console.log("server started");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!  shutting down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
