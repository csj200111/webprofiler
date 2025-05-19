const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 등록
const dataRouter = require('./routes/dataRoute');
app.use('/api', dataRouter);

// 기본 페이지
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
