import { Router } from "express";

import { UserRegisterController } from "./modules/UserRegister/UserRegisterController.js";
import { LoginController } from "./modules/Login/LoginController.js";

const router = Router()

const userRegisterController = new UserRegisterController()
const loginController = new LoginController()


router.post("/register", userRegisterController.handle)
router.post("/login", loginController.handle)



export { router }

