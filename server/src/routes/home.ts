import { Router } from "express";
import DI from "..";
import { auth } from "../middleware/auth";
import { catchAsync } from "../middleware/error";
import { User } from "../models";

const router = Router();

router.get(
  "/home",
  auth,
  catchAsync(async (req: any, res) =>
    res.json(await DI.em?.findOne(User, { id: req.session!.userId }))
  )
);

export default router;
