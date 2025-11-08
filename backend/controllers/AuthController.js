import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

// Registro
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validar duplicados
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await UserModel.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });


    res.status(201).json({ message: "Usuario registrado con éxito", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error });
  }
};


// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔽 Normalizar email
    const normalizedEmail = email.toLowerCase().trim();

    // Buscar usuario
    const user = await UserModel.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // 🚫 Verificar si está deshabilitado
    if (!user.active) {
      return res.status(403).json({
        message: "Tu cuenta ha sido deshabilitada. Contacta con el administrador.",
      });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Credenciales inválidas" });

    // Crear token
    // incluir el rol en el token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token, role: user.role });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el login", error });
  }
};

