import { application, Router } from "express"
import AuthenticateController from "./controllers/AuthenticateController"

const router = Router()


const authenticateController = new AuthenticateController()

router.post("/api/signup", authenticateController.signUp)
router.post("/api/login", authenticateController.login)

export default router

