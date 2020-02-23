const express = require("express");
const server = require("./server");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
console.log(process.env.PORT);

server.listen(PORT, () => {
  console.log(`Ayyyyy ${PORT} is up baby!`);
});

module.exports = server;
