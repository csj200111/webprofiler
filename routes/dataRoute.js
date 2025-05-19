
const express = require('express');
const multer = require('multer');
const path = require('path');
const sequelize = require('../models/sequelize');
const DataModel = require('../models/DataModel');
const { parseInputFile } = require('../services/fileParser');

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// 파일 업로드 후 DB 저장
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, path: filePath } = req.file;
    const tableName = originalname.replace(/\.[^/.]+$/, '').toLowerCase();

    const parsedData = parseInputFile(filePath);
    const DynamicModel = DataModel.initModel(sequelize, tableName);
    await DynamicModel.sync();

    await DynamicModel.bulkCreate(parsedData);
    res.json({ status: 'success', message: `${originalname} 업로드 및 저장 완료` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: '업로드 실패' });
  }
});

//  Core 기준 통계 API
router.get('/statistics/core/:table/:core', async (req, res) => {
  const { table, core } = req.params;
  const DynamicModel = DataModel.initModel(sequelize, table);

  const result = await DynamicModel.findAll({
    attributes: [
      'task',
      [sequelize.fn('min', sequelize.col('usaged')), 'min_usaged'],
      [sequelize.fn('max', sequelize.col('usaged')), 'max_usaged'],
      [sequelize.fn('avg', sequelize.col('usaged')), 'avg_usaged'],
    ],
    where: { core },
    group: ['task']
  });

  res.json(result);
});

// Task 기준 통계 API
router.get('/statistics/task/:table/:task', async (req, res) => {
  const { table, task } = req.params;
  const DynamicModel = DataModel.initModel(sequelize, table);

  const result = await DynamicModel.findAll({
    attributes: [
      'core',
      [sequelize.fn('min', sequelize.col('usaged')), 'min_usaged'],
      [sequelize.fn('max', sequelize.col('usaged')), 'max_usaged'],
      [sequelize.fn('avg', sequelize.col('usaged')), 'avg_usaged'],
    ],
    where: { task },
    group: ['core']
  });

  res.json(result);
});

//  Core/Task 목록 조회 API 추가
router.get('/statistics/info/:table', async (req, res) => {
  const { table } = req.params;
  const DynamicModel = DataModel.initModel(sequelize, table);

  try {
    const cores = await DynamicModel.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('core')), 'core']]
    });

    const tasks = await DynamicModel.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('task')), 'task']]
    });

    res.json({
      cores: cores.map(c => c.core),
      tasks: tasks.map(t => t.task),
    });
  } catch (err) {
    console.error("❌ core/task 목록 불러오기 실패:", err);
    res.status(500).json({ error: 'core/task 목록을 가져오는 중 오류 발생' });
  }
});

module.exports = router;
