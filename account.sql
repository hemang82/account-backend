-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2026 at 11:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `account`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parties`
--

CREATE TABLE `tbl_parties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gst_number` varchar(255) NOT NULL,
  `pan_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_parties`
--

INSERT INTO `tbl_parties` (`id`, `name`, `phone_number`, `email`, `gst_number`, `pan_number`, `address`, `created_at`, `updated_at`, `is_active`, `is_delete`) VALUES
(1, 'Chandekar Hemang Prakashbai', '7894561237', 'hemang@gmail.com', 'gst_1234gstDWZ', 'CDUPC7411', 'Thlatej', '2026-01-23 06:28:27', '2026-01-23 08:58:08', 1, 0),
(5, 'Chandekar Hemang Prakashbai', '7894561237', 'hemang@gmail.com', 'gst_1234gstDWZ', 'CDUPC7411', 'Thlatej', '2026-01-23 06:40:01', '2026-01-23 09:01:04', 1, 0),
(7, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 06:40:47', '2026-01-23 06:40:47', 1, 0),
(8, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 06:40:48', '2026-01-23 06:40:48', 1, 0),
(9, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 06:41:08', '2026-01-23 06:41:08', 1, 0),
(10, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 06:58:08', '2026-01-23 06:58:08', 1, 0),
(11, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 06:58:34', '2026-01-23 06:58:34', 1, 0),
(12, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 07:01:29', '2026-01-23 07:01:29', 1, 0),
(13, 'Test Data', '1234567891', '', '', '', '', '2026-01-23 07:03:09', '2026-01-23 07:03:09', 1, 0),
(14, 'Niraj', '7405546758', 'test@gmail.com', '12456789GST', 'CDUPC7411A', 'Narol Ahmedabd', '2026-01-23 07:04:18', '2026-01-23 07:04:18', 1, 0),
(15, 'Niraj', '7405546758', 'test@gmail.com', '12456789GST', 'CDUPC7411A', 'Narol Ahmedabd', '2026-01-23 07:07:10', '2026-01-23 07:07:10', 1, 0),
(16, 'Chandekar Hemang', '8238403910', '', '', '', '', '2026-01-23 08:38:43', '2026-01-23 08:38:43', 1, 0),
(17, 'Chandekar Hemang', '8238403910', 'hemang@gmail.com', '', '', '', '2026-01-23 08:38:55', '2026-01-23 08:38:55', 1, 0),
(18, 'Chandekar Hemang', '8238403910', 'hemang@gmail.com', '8238403910', 'CDUPC7411', 'Thlatej', '2026-01-23 08:39:14', '2026-01-23 08:39:14', 1, 0),
(19, 'Chandekar Hemang', '8238403910', 'hemang@gmail.com', '8238403910', 'CDUPC7411', 'Thlatej', '2026-01-23 08:41:32', '2026-01-23 08:41:32', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sales`
--

CREATE TABLE `tbl_sales` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `vc_type` varchar(255) DEFAULT NULL,
  `vc_number` varchar(255) DEFAULT NULL,
  `document_number` varchar(255) DEFAULT NULL,
  `document_date` varchar(255) DEFAULT NULL,
  `taxable` varchar(255) DEFAULT NULL,
  `IGST` varchar(255) DEFAULT NULL,
  `CGST` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `SGST` varchar(255) DEFAULT NULL,
  `TAX` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sales`
--

INSERT INTO `tbl_sales` (`id`, `invoice_number`, `date`, `vc_type`, `vc_number`, `document_number`, `document_date`, `taxable`, `IGST`, `CGST`, `SGST`, `TAX`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, '12345', '21-07-2001', 'sale', '123465', '123456', '21-07-2001', '500', '600', 'current_timestamp()', '100', '5000', 1, 0, '2026-01-23 09:41:54', '2026-01-23 10:16:28'),
(2, '123456', '21-07-2005', 'service', '1234658', '123456', '21-07-2001', '500', '600', '', '100', '800000', 1, 0, '2026-01-23 10:05:37', '2026-01-23 10:23:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_parties`
--
ALTER TABLE `tbl_parties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_parties`
--
ALTER TABLE `tbl_parties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
