export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verificando rol", error });
  }
};
