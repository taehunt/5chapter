const User = require("../models/User");

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("이미 존재하는 사용자명입니다.");
    }

    // 회원 생성
    await User.create({ username, password });
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("회원가입 중 오류 발생");
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.send("해당 유저가 존재하지 않습니다.");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.send("비밀번호가 일치하지 않습니다.");

    // 세션에 유저 정보 저장
    req.session.user = {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    res.redirect("/posts");
  } catch (err) {
    console.error(err);
    res.send("로그인 중 오류 발생");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
