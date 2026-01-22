import jwt from "jsonwebtoken";

export default function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "User without authorization" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Not enough rights" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "User without authorization" });
    }
  };
}
