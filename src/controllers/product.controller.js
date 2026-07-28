import Product from '../models/product.model.js';

export const getAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
};

export const create = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || price == null) return res.status(400).json({ error: 'name and price required' });
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch {
    res.status(400).json({ error: 'Invalid id or data' });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
};