-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 12:39 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ringco_partylist`
--

-- --------------------------------------------------------

--
-- Table structure for table `party_list`
--

CREATE TABLE `party_list` (
  `id` int(11) NOT NULL,
  `item_name` text NOT NULL,
  `owner_name` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `party_list`
--

INSERT INTO `party_list` (`id`, `item_name`, `owner_name`, `isActive`) VALUES
(1, '2 בקבוקי מים', NULL, 1),
(2, '2 בקבוקי מים', NULL, 1),
(3, '2 בקבוקי מים', NULL, 1),
(4, '2 בקבוקי מים', NULL, 1),
(5, '2 בקבוקי שתיה קלה', NULL, 1),
(6, '2 בקבוקי שתיה קלה', NULL, 1),
(7, '2 בקבוקי שתיה קלה', NULL, 1),
(8, '2 בקבוקי שתיה קלה', NULL, 1),
(9, 'חצי קילו בורקס גבינה', NULL, 1),
(10, 'חצי קילו בורקס גבינה', NULL, 1),
(11, 'חצי קילו בורקס גבינה', NULL, 1),
(12, 'חצי קילו בורקס תפוא', NULL, 1),
(13, 'חצי קילו בורקס תפוא', NULL, 1),
(14, '50 צלחות', NULL, 1),
(15, '100 מפיות', NULL, 1),
(16, '100 כוסות חפ', NULL, 1),
(17, '100 כוסות חפ', NULL, 1),
(18, '2 חטיפים גדולים', NULL, 1),
(19, '2 חטיפים גדולים', NULL, 1),
(20, '2 חטיפים גדולים', NULL, 1),
(21, '2 חטיפים ללא גלוטן', NULL, 1),
(22, '2 חטיפים ללא גלוטן', NULL, 1),
(23, 'עוגה בחושה פרוסה', NULL, 1),
(24, 'עוגה בחושה פרוסה', NULL, 1),
(25, 'מתנדב להביא שולחן', NULL, 1),
(26, 'מתנדב להביא שולחן', NULL, 1),
(27, 'פירות עונה בכוסות', 'אירנה', 1),
(28, 'פירות עונה בכוסות', 'אירנה', 1),
(29, 'לחם', 'רינה', 1),
(30, 'cakes', 'רינה', 1),
(31, 'cakes', 'רינה', 1),
(32, 'cakes', 'dina', 1),
(33, 'כוסות', 'אירנה', 1),
(34, 'כוסות', 'אירנה', 1),
(35, 'כוסות', 'אירנה', 1),
(36, 'כוסות', 'אירנה', 1),
(37, 'כוסות', 'דוד', 1),
(38, 'כוסות', 'רועי', 0),
(39, 'כוסות', 'אירנה', 1),
(40, 'כוסות', 'אירנה', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `party_list`
--
ALTER TABLE `party_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `party_list`
--
ALTER TABLE `party_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
