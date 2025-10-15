const express = require("express");
const { crudController } = require("../controller/crudController");

const crudRouter = (Model) => {
  const router = express.Router();
  const controller = crudController(Model); // <-- controller should return an object with functions
  // Each route expects a function as handler
  router.post("/", controller.create);
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById).put("/:id", controller.update).delete("/:id", controller.remove).patch("/:id", controller.update);

  return router;
};

module.exports = { crudRouter };
