require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();

// ✅ 환경변수 확인
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI 환경변수가 정의되지 않았습니다.");
  process.exit(1); // 앱 실행 중단
}

// ✅ MongoDB 연결
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB 연결 완료"))
  .catch((err) => {
    console.error("❌ MongoDB 연결 실패:", err);
    process.exit(1); // 연결 실패 시 종료
  });

// ✅ EJS 템플릿 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout"); // views/layout.ejs 사용

// ✅ 정적 파일, 폼 파싱
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ✅ 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET || "secret-key", // 보안 향상
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
  }),
}));

// ✅ 세션 유저 정보 + 기본 변수 템플릿에 전달
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.title = "풀스택 웹앱"; // 기본 타이틀 지정 (오류 방지)
  next();
});

// ✅ 라우터 등록
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const adminRoutes = require("./routes/admin");

app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/admin", adminRoutes);

// ✅ 홈 라우터 (title 포함)
app.get("/", (req, res) => {
  res.render("index", {
    title: "홈",
  });
});

// ✅ 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
