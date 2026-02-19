import Product from "../models/Product.js";

// @desc Obtener todos los productos
export const getProducts = async (req, res) => {
  const { category, featured, search } = req.query;

  let query = {};

  if (category) query.category = category;
  if (featured) query.featured = featured === "true";

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

// @desc Obtener producto por ID
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.json(product);
};

// @desc Crear producto
export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();

  res.status(201).json(created);
};

// @desc Actualizar producto
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  Object.assign(product, req.body);
  const updated = await product.save();

  res.json(updated);
};

// @desc Eliminar producto
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  await product.deleteOne();

  res.json({ message: "Producto eliminado" });
};
