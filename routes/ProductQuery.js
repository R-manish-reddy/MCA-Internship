const express = require("express");
const db = require("../db"); // Import the database connection
const router = express.Router();
const { isAuthenticated } = require('../authentication');
// Define your product-related routes here
//task 3
router.get("/filter",isAuthenticated, (req, res) => {
    const categoryName = req.query.category; // Get the category name from the query parameter
    const brandName = req.query.brand; // Get the brand name from the query parameter
    const isAvailable = req.query.is_available; // Get the is_available value from the query parameter
    const minPrice = req.query.min_price; // Get the minimum price from the query parameter
    const maxPrice = req.query.max_price; // Get the maximum price from the query parameter
  
    // Check if the category, brand, is_available, min_price, or max_price query parameters are provided
    if (!categoryName && !brandName && !isAvailable && !minPrice && !maxPrice) {
      res
        .status(400)
        .json({
          error:
            "category, brand, is_available, min_price, and/or max_price parameters are missing",
        });
      return;
    }
  
    // Build the SQL query dynamically based on the provided filters
    const filters = [];
    const queryParams = [];
  
    if (categoryName) {
      filters.push(
        "category_id IN (SELECT category_id FROM category WHERE category = ?)"
      );
      queryParams.push(categoryName);
    }
  
    if (brandName) {
      filters.push("brand = ?");
      queryParams.push(brandName);
    }
  
    if (isAvailable) {
      filters.push("is_available = ?");
      queryParams.push(parseInt(isAvailable)); // Assuming is_available is a boolean or integer
    }
  
    if (minPrice && maxPrice) {
      filters.push("price BETWEEN ? AND ?");
      queryParams.push(parseFloat(minPrice));
      queryParams.push(parseFloat(maxPrice));
    } else if (minPrice) {
      filters.push("price >= ?");
      queryParams.push(parseFloat(minPrice));
    } else if (maxPrice) {
      filters.push("price <= ?");
      queryParams.push(parseFloat(maxPrice));
    }
  
    let query = "SELECT * FROM product";
  
    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }
    console.log(query);
    // Query the database to retrieve products based on the specified filters
    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error executing SQL query: " + err.stack);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
  
      res.json(results);
      // console.log('query is : '+query)
    });
  });
  
  
  //task 8
  router.get("/search",isAuthenticated, (req, res) => {
    const keywords = req.query.keyword;
  
    // Check if keywords are provided in the query parameters
    if (!keywords) {
      return res
        .status(400)
        .json({ error: "Keywords are required for the search from manish" });
    }
  
    //const query = `SELECT * FROM product WHERE des LIKE '%${keywords}%' or product_name LIKE '%${keywords}%'  `;
  const query = `SELECT
    'Product' AS table_name,
    p.*,
    c.category AS category_name
  FROM Product AS p
  LEFT JOIN Category AS c ON p.category_id = c.category_id
  WHERE p.des LIKE '%${keywords}%'
    OR p.product_name LIKE '%${keywords}%'
    OR c.category LIKE '%${keywords}%';`;
    
    db.query(query, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error" });
      }
  
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "No products found matching the keywords" });
      }
  
      // Return the matching products as JSON
      res.status(200).json(results);
    });
  });
  
  //task 9
  router.get("/sort",isAuthenticated, (req, res) => {
    const { sortBy } = req.query;
  
    // Check if sortBy parameter is provided
    if (!sortBy) {
      return res
        .status(400)
        .json({ error: "Sort criteria (sortBy) is required" });
    }
  
    // Define a SQL query to sort products based on the specified criteria
    let query = "SELECT * FROM Product";
  
    // Add the ORDER BY clause based on the specified sortBy parameter
    switch (sortBy) {
      case "price":
        query += " ORDER BY price ASC";
        break;
      case "popularity":
        query = `SELECT p.*, IFNULL(pl.likes, 0) AS like_count
        FROM Product p
        LEFT JOIN ProductLikes pl ON p.product_id = pl.product_id
        ORDER BY like_count DESC;`;
        break;
      case "releaseDate":
        query += " ORDER BY release_date DESC";
        break;
      default:
        return res
          .status(400)
          .json({ error: "Invalid sort criteria specified" });
    }
  
    db.query(query, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", q: query });
      }
  
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "No products found" });
      }
  
      // Return the sorted products as JSON
      res.status(200).json(results);
    });
  });

  module.exports = router;