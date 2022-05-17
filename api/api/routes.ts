import { application, Router } from "express"
import AuthenticateController from "./controllers/AuthenticateController"
import MessageController from "./controllers/MessagesController"
import ensureAuthenticated from "./middlewares/ensureAuthenticated"

const router = Router()


const authenticateController = new AuthenticateController()
const messageController = new MessageController()

router.post("/api/signup", authenticateController.signUp)
router.post("/api/login", authenticateController.login)

// Messages
router.post("/api/message", ensureAuthenticated, messageController.create)
router.get("/api/messages/:id", ensureAuthenticated, messageController.show)

export default router

