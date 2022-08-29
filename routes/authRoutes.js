import { Router } from "express";
import {
  get_logout,
  post_login,
  post_signup,
  delete_user,
} from "../controllers/userController.js";
import {
  get_home,
  get_todos,
  get_signup,
  get_login,
  get_user,
} from "../controllers/pageController.js";
import { delete_todo, post_todo } from "../controllers/todoController.js";
import {
  requireAuth,
  checkUser,
  getUser,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("*", checkUser);

router.get("/", get_home);
router.get("/todos", requireAuth, get_todos);
router.get("/user", requireAuth, get_user);

router.get("/signup", get_signup);
router.post("/signup", post_signup);

router.get("/login", get_login);
router.post("/login", post_login);

router.post("/postTodo", getUser, post_todo);
router.post("/deletePost", getUser, delete_todo);

router.get("/logout", get_logout);
router.delete("/deleteUser", getUser, delete_user);

export default router;
