import { Router } from "express";
import { auth } from "../middleware/auth";
import { catchAsync } from "../middleware/error";
import { logOut } from "../util";

const router = Router();

router.post(
  "/logout",
  auth,
  catchAsync(async (req, res) => {
    await logOut(req, res);

    res.json({ message: "ok" });
  })
);

export default router;
