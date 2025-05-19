# JavaWeb CPU Profiler

웹 기반 CPU 코어/태스크 데이터 시각화 및 통계 분석 프로그램이다. `.txt` 형식의 데이터를 업로드하여 MySQL에 저장하고, Core 또는 Task 기준으로 최소/최대/평균 사용량을 시각화한다.

---

##  요구사항

- Node.js (v16 이상 권장)
- npm
- MySQL (8.x 또는 호환 버전)

---

##  폴더 구조

```
project-root/
├── app.js
├── config/
│   └── config.json
├── models/
│   ├── DataModel.js
│   └── sequelize.js
├── routes/
│   └── dataRoute.js
├── services/
│   └── fileParser.js
├── uploads/              # 업로드된 파일 저장소
├── views/
│   └── index.html
├── public/
│   └── js/
│       └── chartHandler.js
├── package.json
```

---

## ⚙️ 설치 방법

```
# 1. 의존성 설치
npm install

# 2. sql 데이터베이스 연결하기
mysql -u root -p 비밀번호

# 3. MySQL에 DB 생성
CREATE DATABASE javaweb;

# 4. DB 교체
USE javaweb;

# 5. config/config.json 파일 설정
```

### 📄 config/config.json 예시

```json
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "javaweb",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false
  }
}
```

---

##  실행 방법

```
node app.js
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속하면 된다.

---


##  사용 방법

1. 메인 페이지에서 `.txt` 파일 업로드
2. 테이블 이름 입력 (예: inputfile)
3. [Core/Task 목록 불러오기] 버튼 클릭
4. Core 또는 Task 버튼을 클릭하여 통계 그래프 확인

---

##  주요 기능

- `.txt` 파일 업로드 및 파싱 처리
- MySQL DB 저장 및 테이블 자동 생성
- core/task 기준 min, max, avg 계산
- Chart.js를 통한 시각화
- Core/Task 버튼 자동 생성 및 선택 기능

---

##  추가 정보

- 업로드된 파일은 `/uploads`에 저장된다
- 파일명은 테이블명으로 사용되며 확장자는 제거된다
- 같은 이름의 파일을 다시 업로드하면 테이블에 데이터가 추가된다

---


## 📄 라이선스

MIT License