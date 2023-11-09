-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommdb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `des` text,
  `category_id` int DEFAULT NULL,
  `release_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_available` tinyint(1) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Smartphone X','TechCo','A high-end smartphone',1,'2023-09-14 16:35:54',1,799.99),(2,'T-shirt','FashionBrand','Cotton t-shirt',2,'2023-09-14 16:35:54',1,19.99),(3,'Coffee Maker','KitchenTech','Automatic coffee maker',3,'2023-09-14 16:35:54',1,89.99),(4,'Smartwatch Pro','TechCo','Feature-rich smartwatch',1,'2023-09-15 13:43:36',1,249.99),(5,'Wireless Headphones','SoundTech','High-quality wireless headphones',1,'2023-09-15 13:43:36',1,129.99),(6,'Tablet Epsilon','TechCo','10-inch tablet',1,'2023-09-15 13:43:36',1,299.99),(7,'Jeans','FashionBrand','Classic denim jeans',2,'2023-09-15 13:44:04',1,39.99),(8,'Dress Shirt','FashionBrand','Formal dress shirt',2,'2023-09-15 13:44:04',1,29.99),(9,'Sneakers','FashionFoot','Stylish sneakers',2,'2023-09-15 13:44:04',1,34.99),(11,'Blender','KitchenTech','High-speed blender',3,'2023-09-15 13:44:33',1,79.99),(12,'Electric Kettle','KitchenTech','Stainless steel electric kettle',3,'2023-09-15 13:44:33',1,29.99),(13,'Winter Coat','FashionBrand','Warm winter coat',2,'2023-09-15 13:57:42',0,79.99),(47,'Updated Product Name 4747474','Updated 4747','Updated 4747',2,'2023-10-07 20:12:47',1,49.99);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 21:38:52
