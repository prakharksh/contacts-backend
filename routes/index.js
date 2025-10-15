const router = require('express').Router();
const { validateTokenHandler } = require("../middleware/validateTokenHandler");
const crudRouter = require("./crudRouter").crudRouter;
const Contact = require("../models/contactModel");
router.use(validateTokenHandler);
router.use('/contacts', crudRouter(Contact));
module.exports = router;