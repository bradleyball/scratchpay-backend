require("dotenv").config();
const express = require("express");
const server = express();
const tableRoute = require("./resources/table/tableRouter");
const authRouter = require("./resources/auth/authRouter");
const userRouter = require("./resources/user/userRouter");
const cors = require("cors");
const morgan = require("morgan");

//***************************** Middleware  *****************/

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

//******************* Routers *****************************/
server.get("/", (req, res) => {
  res.json({ data: "Working" });
});
server.use("/api/v1/table", tableRoute);
server.use("/api/v1/auth", authRouter);
server.use("/api/v1/user", userRouter);

// ****************** PORT SET UP *************************

module.exports = server;
