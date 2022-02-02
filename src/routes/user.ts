import { Router } from "express";
import { signin, signup, validateUser } from "../controllers/user";
import { verifyUser } from "../middlewares/auth";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/validate", verifyUser, validateUser);

export { router as userRouter };
