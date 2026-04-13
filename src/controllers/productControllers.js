import Product from "../models/Product.js";

// @desc Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "subcategory",
        populate: {
          path: "category",
          model: "Category",
        },
      });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  try {
    const product = new Product({
      ...req.body,
      subcategory: req.body.subcategory,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creando producto" });
  }
};

// @desc Actualizar producto
export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );

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
