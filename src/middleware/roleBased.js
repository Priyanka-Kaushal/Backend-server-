const checkRole = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role; // make sure req.user exists
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = checkRole;
