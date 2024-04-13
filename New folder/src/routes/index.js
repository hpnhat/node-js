import { Router } from "express";
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
const router = new Router();

router.use("/products", routerProduct);
router.use("/auth", routerAuth);

export default router;
