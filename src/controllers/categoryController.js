import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const data = await Category.find().sort({ name: 1 });
  res.json(data);
};

export const getCategoryById = async (req, res) => {
  const data = await Category.findById(req.params.id);
  if (!data) return res.status(404).json({ message: "No encontrada" });
  res.json(data);
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({ name: req.body.name, image: req.body.image });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creando categoría" });
  }
};

export const updateCategory = async (req, res) => {
  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, image: req.body.image },
    { new: true }
  );
  res.json(updated);
};

export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Categoría eliminada" });
};