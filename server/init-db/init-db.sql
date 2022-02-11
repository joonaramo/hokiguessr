CREATE DATABASE IF NOT EXISTS hokiguessr;
USE hokiguessr;
CREATE TABLE IF NOT EXISTS goal (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  player_id INT NOT NULL,
  event_id INT NOT NULL,
  date DATETIME
);
CREATE TABLE IF NOT EXISTS player (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  player_id INT NOT NULL UNIQUE,
  points_ratio DECIMAL(4, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS `user` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username varchar(60) NOT NULL,
  `password` char(60) NOT NULL,
  points int DEFAULT 0,
  is_admin tinyint(1) DEFAULT 0,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS prediction (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  points_used int unsigned DEFAULT NULL,
  points_ratio decimal(4, 2) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  completed_at datetime DEFAULT NULL,
  correct tinyint(1) NOT NULL DEFAULT 0,
  completed tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int NOT NULL,
  player_id int NOT NULL,
  game_id int NOT NULL,
  notification_seen tinyint(1) NOT NULL DEFAULT 0,
  KEY `user_id` (`user_id`),
  CONSTRAINT `prediction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);