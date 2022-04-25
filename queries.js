require('dotenv').config()
const Pool = require("pg").Pool;

const databaseConfig = { connectionString: process.env.DATABASE_URL};

const pool = new Pool(databaseConfig)

const getProducts = (request, response) => {
  pool.query("SELECT * FROM products ORDER BY product_id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProductById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM products WHERE product_id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createProduct = (request, response) => {
  const { name, price, description, image } = request.body;

  pool.query(
    "INSERT INTO products (name, price, description, image) VALUES ($1, $2, $3, $4)",
    [name, price, description, image],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Product added with ID: ${results.insertID}`);
    }
  );
};

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, price, description, image } = request.body;

  pool.query(
    "UPDATE products SET name = $1, price = $2, description = $3, image = $4 WHERE product_id = $5",
    [name, price, description, image, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM products WHERE product_id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
