const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();
const { isAuthenticated } = require('../authentication');
// Define your product-related routes here

//task 1
router.get("/",isAuthenticated, (req, res) => {
  db.query("SELECT * FROM product;", (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});




//task 2
router.get("/:id",isAuthenticated, (req, res) => {
  const productId = req.params.id;

  db.query(
    "SELECT * FROM product WHERE product_id = ?",
    [productId],
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else if (result.length === 0) {
        res
          .status(404)
          .json({ error: "Product not found from single product err" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

//task 3
router.get('/:product_id/reviews',isAuthenticated, (req, res) => {
  const productId = req.params.product_id; // Get the product_id from the URL parameter

  // Check if the product_id parameter is provided
  if (!productId) {
    res.status(400).json({ error: 'product_id parameter is missing' });
    return;
  }

  // Query the database to retrieve reviews and ratings for the specified product
  const query = 'SELECT product_id,review_id,review FROM review WHERE product_id = ?';
  db.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Error executing SQL query: ' + err.stack);
      res.status(500).json({ error: 'Internal server error from review get method' });
      return;
    }
    res.json(results);
  });
});

// Task 4

router.get('/:id/related',isAuthenticated, (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM product WHERE category_id IN (select category_id from product where product_id = ?)'
  db.query(query, [productId], (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Product not found from related products API' });
    } else {
      res.status(200).json(result);
    }
  });
});


//task 5
// Endpoint for retrieving product images
router.get('/:product_id/images',isAuthenticated, (req, res) => {
  const productId = req.params.product_id;

  // Query the database to retrieve images for the specified product
  const query = 'SELECT image FROM Image WHERE product_id = ?';

  db.query(query, [productId], (err, results) => {
      if (err) {
          res.status(500).json({ error: 'Database error' });
      } else if (results.length === 0) {
          res.status(404).json({ error: 'Product images not found' });
      } else {
          res.status(200).json(results);
      }
  });
});


// task 6
// Endpoint for Product Details
router.get('/:product_id/details',isAuthenticated, (req, res) => {
  const productId = req.params.product_id;

  // Fetch product details for the specified product_id
  db.query(
    'SELECT pd.*, p.is_available FROM product_details pd JOIN product p ON pd.product_id = p.product_id WHERE pd.product_id = ?',
    [productId],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Product details not found' });
      } else {
        const productDetails = results[0];
        res.status(200).json(productDetails);
      }
    }
  );
});




module.exports = router;
