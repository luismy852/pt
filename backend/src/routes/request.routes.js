import { Router } from "express";
import { aproveRequest, createRequest, listRequest, listUsers } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.js"

import env from 'dotenv'
const router = Router();
env.config();


router.post("/request", authMiddleware, createRequest)
router.get("/request", listRequest)
router.put("/request/:id", aproveRequest)
router.get("/users", listUsers)

export default router;
