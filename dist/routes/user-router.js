import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser, } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate, } from "../utils/data-validators.js";
import { verifytoken } from "../utils/jwt-token-generator.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifytoken, verifyUser);
userRoutes.get("/logout", verifytoken, userLogout);
export default userRoutes;
//# sourceMappingURL=user-router.js.map