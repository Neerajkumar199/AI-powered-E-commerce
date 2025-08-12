import express from "express";
import { googleLogin,login ,logOut ,registration } from "../controller/authController.js";

const authRoutes = express.Router();

// POST /api/auth/registration
authRoutes.post("/registration", registration);
authRoutes.post("/login",login);
authRoutes.get("/logOut",logOut);
authRoutes.post("/googlelogin",googleLogin)
export default authRoutes;
