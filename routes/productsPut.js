const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();
const { isAuthenticated } = require('../authentication');

router.put("/update/:productId", (req, res) => {
    // Assuming you have a JSON request body with the updated product data
  
    // Check if the user is an admin
    const isAdmin = req.session.user && req.session.user.role === 'admin';
  
    // If the user is not an admin, respond with an error
    if (!isAdmin) {
      return res.status(403).json({ error: "Only admin users can update products" });
    }
  
    const productId = req.params.productId;
  
    const {
      product_name,
      brand,
      des,
      category_id,
      is_available,
      price,
    } = req.body;
  
    // Validate the request body (you can add more validation)
    if (!product_name || !brand || !price || !des || !category_id || is_available === null) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // Update the product in the database
    db.query(
      "UPDATE Product SET product_name = ?, brand = ?, des = ?, category_id = ?, is_available = ?, price = ? WHERE product_id = ?",
      [product_name, brand, des, category_id, is_available, price, productId],
      (err, result) => {
        if (err) {
          console.error("Error updating product:", err);
          return res.status(500).json({ error: "Error updating product" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Product not found" });
        }
  
        res.status(200).json({ message: "Product updated successfully" });
      }
    );
  });
  

  router.put('/:product_id/details', (req, res) => {
    // Check if the user is an admin
    const isAdmin = req.session.user && req.session.user.role === 'admin';
  
    // If the user is not an admin, respond with an error
    if (!isAdmin) {
      return res.status(403).json({ error: "Only admin users can update product details" });
    }
  
    const productId = req.params.product_id; // Extract product_id from the URL parameter
    const { specifications, dimensions } = req.body;
  
    // Check if all required fields are provided
    if (!productId || !specifications || !dimensions) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    // Update the product details in the database
    const updateQuery = 'UPDATE product_details SET specifications = ?, dimensions = ? WHERE product_id = ?';
    db.query(updateQuery, [specifications, dimensions, productId], (err, result) => {
      if (err) {
        console.error('Error updating product details in the database: ' + err.stack);
        res.status(500).json({ error: 'Internal server error from product detail put method' });
        return;
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Product details not found' });
      }
  
      res.json({ message: 'Product details updated successfully' });
    });
  });

  
  router.put('/:product_id/reviews/:review_id', isAuthenticated, (req, res) => {
    // Check if the user is an admin
    const isAdmin = req.session.user && req.session.user.role === 'admin';
  
    if (isAdmin) {
      return res.status(403).json({ error: "Admin users cannot update reviews" });
    }
  
    const productId = req.params.product_id;
    const reviewId = req.params.review_id;
    const updatedReviewText = req.body.review;
  
    // Check if the updated review text is provided in the request body
    if (!updatedReviewText) {
      res.status(400).json({ error: 'Updated review text is missing' });
      return;
    }
  
    // Update the review in the database
    const updateQuery = 'UPDATE Review SET review = ? WHERE review_id = ? AND product_id = ?';
    db.query(updateQuery, [updatedReviewText, reviewId, productId], (err, result) => {
      if (err) {
        console.error('Error updating review in the database: ' + err.stack);
        res.status(500).json({ error: 'Internal server error from review put method' });
        return;
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.json({ message: `Review for product: ${productId} updated successfully` });
    });
  });
  

  module.exports = router;