SET NAMES UTF8;
CREATE DATABASE vuex CHARSET=UTF8;
USE vuex;

CREATE TABLE vxdata(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(32) DEFAULT NULL,
  isFinished BOOLEAN,
  isshow BOOLEAN
);
INSERT INTO vxdata VALUES
(1, 'vue-study', 0, 1),
(2, 'echart-study', 0, 1),
(3, 'nodejs-study', 0, 1),
(4, 'D3-study', 0, 1);

