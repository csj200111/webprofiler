// models/sequelize.js
const { Sequelize } = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 연결 확인 로그 추가
sequelize.authenticate()
  .then(() => console.log('✅ MySQL 연결 성공 (sequelize.js에서)'))
  .catch((err) => console.error('❌ MySQL 연결 실패:', err));

module.exports = sequelize;
