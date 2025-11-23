import { Router } from "express";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/course.controller.js";
import {adminMiddleware, authMiddleware} from "../middlewares/auth.js"

import env from 'dotenv'
const router = Router();
env.config();


router.post("/course", authMiddleware, adminMiddleware, createCourse)

router.get("/course", getCourses)

router.get("/course/:id", getCourseById)
router.put("/course/:id", authMiddleware, adminMiddleware, updateCourse)

router.delete("/course/:id", authMiddleware, adminMiddleware, deleteCourse)


export default router;

//module.exports = (app) =>  app.use (router)
