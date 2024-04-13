import { Router } from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controller/product.js";

const routerProduct = Router();

routerProduct.get("/", getAll);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", create);
routerProduct.put("/:id", update);
routerProduct.delete("/:id", remove);

export default routerProduct;
