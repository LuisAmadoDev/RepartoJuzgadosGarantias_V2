import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel.js";

// 🔹 Obtener todos los usuarios (solo admin)
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios", error });
  }
};

// 🔹 Obtener un solo usuario (solo admin)
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; 

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario", error });
  }
};



// 🔹 Crear un nuevo usuario (solo admin)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user",
      active: true,
    });

    await user.save();
    res.status(201).json({ message: "Usuario creado correctamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario", error });
  }
};

// 🔹 Actualizar usuario (solo admin)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario actualizado correctamente", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario", error });
  }
};

// 🔹 Eliminar usuario (solo admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario", error });
  }
};

// Habilitar o deshabilitar usuario (solo admin)
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: `Usuario ${active ? "habilitado" : "deshabilitado"} correctamente.`,
      user,
    });
  } catch (error) {
    console.error("Error al actualizar estado del usuario:", error);
    res.status(500).json({ message: "Error al actualizar estado del usuario", error });
  }
};
