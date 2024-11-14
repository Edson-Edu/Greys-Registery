import { Router } from "express"
import userMiddleware from "../middlewares/user.middleware"
import { checkToken } from "../middlewares/jwt.middleware"
const router = Router()
router.get("/",  checkToken, userMiddleware.listUsers)
router.post("/", userMiddleware.createUser)
router.put("/", userMiddleware.updateUser)
router.delete("/", userMiddleware.deleteUser)
export default router