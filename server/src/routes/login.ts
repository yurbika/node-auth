import { compare } from "bcryptjs";
import { Router } from "express";
import DI from "..";
import { Unauthorized } from "../errors";
import { guest } from "../middleware/auth";
import { catchAsync } from "../middleware/error";
import { User } from "../models";
import { logIn } from "../util";
import { loginSchema } from "../validation";
import { validate } from "../validation/joi";

const router = Router();

router.post(
  "/login",
  guest,
  catchAsync(async (req, res) => {
    await validate(loginSchema, req.body);

    const { email, password } = req.body;

    const user = await DI.em?.findOne(User, { email });
    const valid = await compare(password, user!.password);
    if (!user || !valid) throw new Unauthorized("Incorrect email or password");
    logIn(req, user.id);
    res.json({ message: "OK" });
  })
);

export default router;
