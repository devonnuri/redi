import { Router } from "express";

import User from "./user";
import Posts from "./posts";
import Tags from "./tags";

const router = Router();

router.use("/user", User);
router.use("/posts", Posts);
router.use("/tags", Tags);

export default router;
