import { hash } from "bcryptjs";
import { Router } from "express";
import DI from "..";
import { guest } from "../middleware/auth";
import { catchAsync } from "../middleware/error";
import { User } from "../models";
import { logIn } from "../util/auth";
import { registerSchema } from "../validation";
import { validate } from "../validation/joi";

const router = Router();

router.post(
  "/register",
  guest,
  catchAsync(async (req, res) => {
    await validate(registerSchema, req.body);

    const { email, password, name } = req.body;

    const found = await DI.em?.findOne(User, { email });

    if (found) throw new Error("Invalid email");

    const hashedPwd = await hash(password, 12);

    const user = DI.em?.create(User, { email, name, password: hashedPwd });

    if (user) {
      await DI.em?.persistAndFlush(user);
      logIn(req, user.id);
    }

    res.json({ message: "ok" });
  })
);

export default router;
