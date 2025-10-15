const express = require('express');
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler").validateTokenHandler;
const {getContact, getContactById, createOrUpdateContact, deleteContact} = require("../controller/contactController");
router.use(validateTokenHandler);
router.route('/').get(getContact);
router.route('/').post(createOrUpdateContact);
router.route('/:id').get(getContactById).put(createOrUpdateContact).delete(deleteContact).patch(createOrUpdateContact);

module.exports = router;