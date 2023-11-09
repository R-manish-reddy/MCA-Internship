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
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `review` text,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,'Great smartphone!'),(3,3,'Makes great coffee.'),(4,4,'Impressive smartwatch with great features.'),(5,5,'These headphones have amazing sound quality.'),(6,6,'The tablet is perfect for both work and entertainment.'),(7,7,'Comfortable jeans for everyday wear.'),(8,8,'The dress shirt looks elegant and fits well.'),(9,9,'Stylish sneakers that go well with any outfit.'),(11,11,'Fantastic blender for smoothies.'),(12,12,'The electric kettle boils water quickly.'),(13,4,'Impressive smartwatch with great features.'),(16,5,'These headphones have amazing sound quality.'),(17,5,'Very comfortable to wear for long periods.'),(18,5,'The noise cancellation feature works great.'),(19,6,'The tablet is perfect for both work and entertainment.'),(20,6,'Large screen makes it great for watching movies.'),(21,6,'Fast and responsive performance.'),(22,7,'Comfortable jeans for everyday wear.'),(23,7,'Great fit and durable material.'),(24,7,'Affordable price for the quality.'),(25,8,'The dress shirt looks elegant and fits well.'),(26,8,'Received many compliments when wearing it.'),(27,9,'Stylish sneakers that go well with any outfit.'),(28,9,'Very comfortable for all-day wear.'),(31,11,'Fantastic blender for smoothies.'),(32,11,'Easy to clean and maintain.'),(33,12,'The electric kettle boils water quickly.'),(34,12,'Sleek and modern design.'),(35,12,'Great addition to my kitchen.'),(60,2,'good tshirt'),(61,2,'t shit is next level'),(62,2,'wow, suprised with the quality of the t shirt, got lots of compliments'),(63,2,'thop product edi'),(64,2,'wowowowowowowowowowowowowowo'),(65,2,'best product i ever ordered online'),(66,2,'its a good shirt'),(67,2,'its a good shirt'),(68,2,'next level product'),(69,8,'white shines like anything'),(70,13,'Best rain protection in monsoon'),(71,3,'coffee is too creamy when made with this machine'),(72,9,'too good for casual wear'),(73,1,'huiudbfhujoaubufb');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 21:38:51
