import { Router } from "express";

import * as authCtrl from "./user.ctrl";
import authToken from "../../lib/middleware/authToken";

const User = Router();

User.get("/:userId", authCtrl.getUser);
User.post("/register", authCtrl.register);
User.post("/login", authCtrl.login);
User.post("/logout", authCtrl.logout);
User.post("/checklogin", authToken, authCtrl.checkLogin);

export default User;
