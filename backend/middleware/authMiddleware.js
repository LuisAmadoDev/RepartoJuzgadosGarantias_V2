import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Acceso denegado. Token no encontrado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos el id del usuario
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
