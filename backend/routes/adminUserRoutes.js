import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import {getUsers, getUser, createUser, updateUser, deleteUser, updateUserStatus} from "../controllers/UserController.js";

const router = express.Router();

// Todas las rutas aquí requieren ser admin
router.get("/", authMiddleware, isAdmin, getUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.post("/", authMiddleware, isAdmin, createUser);
router.put("/:id", authMiddleware, isAdmin, updateUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.patch("/:id/status", authMiddleware, isAdmin, updateUserStatus);

export default router;
