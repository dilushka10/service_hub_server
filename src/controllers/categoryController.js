const service = require("../services/categoryService");

// POST
async function create(req, res) {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET ALL
async function getAll(req, res) {
  try {
    const categories = await service.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET ONE
async function getById(req, res) {
  try {
    const category = await service.getCategoryById(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// PUT
async function update(req, res) {
  try {
    const category = await service.updateCategory(req.params.id, req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE
async function remove(req, res) {
  try {
    const result = await service.deleteCategory(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
