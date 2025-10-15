const fs = require("fs");
const path = require("path");
const models = {};

fs.readdirSync(path.join(__dirname, "models"))
  .filter((file) => file.endsWith(".js") && file !== "index.js")
  .forEach((file) => {
    const model = import(`./${file}`, { assert: { type: "json" } });
  });
module.exports = models;
