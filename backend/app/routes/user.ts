const {
  getLoggedInUserController,
  updateMetaController,
  getFeaturedPosts
} = require("../controller/user");
const authenticate = require("../middleware/authenticate");
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/me", authenticate, getLoggedInUserController);
userRoutes.post("/update-meta", authenticate, updateMetaController);
userRoutes.get("/featured-post", authenticate, getFeaturedPosts);

module.exports = userRoutes;
