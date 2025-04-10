const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const User = require("../models/User");

// ✅ 여기 변수명 수정!
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await User.create({
    username: "admin",
    password: "admin123",
    isAdmin: true,
  });
  console.log("✅ 관리자 계정 생성 완료");
  process.exit();
}).catch((err) => {
  console.error("❌ MongoDB 연결 실패", err);
});
