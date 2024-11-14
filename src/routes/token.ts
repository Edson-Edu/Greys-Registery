import { Router } from "express"
import jwtMiddleare from "../middlewares/jwt.middleware"
const router = Router()
router.post("/", jwtMiddleare.createToken)
router.post("/verify", (req, res) => { res.status(501).send("Not Implemented") })
router.post("/refresh", (req, res) => { res.status(501).send("Not Implemented") })
export default router