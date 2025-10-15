const asyncHandler = require("express-async-handler");

const crudController = (Model) => ({
  create: asyncHandler(async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, error: "Request body is missing" });
    }
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  }),

  getAll: asyncHandler(async (req, res) => {
    const docs = await Model.find();
    res.status(200).json({ success: true, data: docs });
  }),

  getById: asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, data: doc });
  }),

  update: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, data: doc });
  }),

  remove: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, data: doc });
  }),
});

module.exports = { crudController };
