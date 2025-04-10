exports.isLoggedIn = (req, res, next) => {
	if (!req.session.user) {
	  return res.redirect("/login");
	}
	next();
  };
  
  exports.isAdmin = (req, res, next) => {
	if (!req.session.user || !req.session.user.isAdmin) {
	  return res.status(403).send("접근 권한이 없습니다.");
	}
	next();
  };
  