import SubCategory from "../models/SubCategory.js";

export const getSubCategories = async (req, res) => {
  const { categoryId } = req.query;

  const filter = categoryId ? { category: categoryId } : {};

  const data = await SubCategory.find(filter)
    .populate("category", "name")
    .sort({ name: 1 });

  res.json(data);
};

export const getSubCategoryById = async (req, res) => {
  const data = await SubCategory.findById(req.params.id).populate(
    "category",
    "name"
  );

  if (!data) return res.status(404).json({ message: "No encontrada" });

  res.json(data);
};

export const createSubCategory = async (req, res) => {
  try {
    const newSub = new SubCategory({
      name: req.body.name,
      category: req.body.category,
    });

    const saved = await newSub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creando subcategoría" });
  }
};

export const updateSubCategory = async (req, res) => {
  const updated = await SubCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: req.body.category,
    },
    { new: true }
  );

  res.json(updated);
};

export const deleteSubCategory = async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Subcategoría eliminada" });
};