const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();
const { isAuthenticated } = require('../authentication');

// DELETE Product
router.delete('/delete/:productId', (req, res) => {
  // Check if the user is an admin
  const isAdmin = req.session.user && req.session.user.role === 'admin';

  // If the user is not an admin, respond with an error
  if (!isAdmin) {
    return res.status(403).json({ error: "Only admin users can delete products" });
  }

  const productId = req.params.productId;

  // Delete the product from the database
  db.query(
    "DELETE FROM Product WHERE product_id = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ error: "Error deleting product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    }
  );
});

// DELETE Product Details
router.delete('/:product_id/details', (req, res) => {
  // Check if the user is an admin
  const isAdmin = req.session.user && req.session.user.role === 'admin';

  // If the user is not an admin, respond with an error
  if (!isAdmin) {
    return res.status(403).json({ error: "Only admin users can delete product details" });
  }

  const productId = req.params.product_id;

  // Delete the product details from the database
  db.query(
    "DELETE FROM product_details WHERE product_id = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error("Error deleting product details:", err);
        return res.status(500).json({ error: "Error deleting product details" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Product details not found" });
      }

      res.status(200).json({ message: "Product details deleted successfully" });
    }
  );
});

// DELETE Review
router.delete('/:product_id/reviews/:review_id', isAuthenticated, (req, res) => {
  // Check if the user is an admin
  const isAdmin = req.session.user && req.session.user.role === 'admin';

  if (isAdmin) {
    return res.status(403).json({ error: "Admin users cannot delete reviews" });
  }

  const productId = req.params.product_id;
  const reviewId = req.params.review_id;

  // Delete the review from the database
  db.query(
    "DELETE FROM Review WHERE review_id = ? AND product_id = ?",
    [reviewId, productId],
    (err, result) => {
      if (err) {
        console.error("Error deleting review:", err);
        return res.status(500).json({ error: "Error deleting review" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.status(200).json({ message: `Review for product: ${productId} deleted successfully` });
    }
  );
});

module.exports = router;
