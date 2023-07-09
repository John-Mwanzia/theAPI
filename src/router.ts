import { Router } from "express";
import { body} from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./handlers/products";
import { get } from "http";
import { createUpdate, deleteUpdate, getAllUpdates, getOneUpdate, updatedUpdate } from "./handlers/update";

const router = Router();

// Product

router.get("/product", getProducts);
router.get("/product/:id", getProduct );
router.post("/product", body("name").isString(), handleInputErrors, createProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

//update

router.get("/update", getAllUpdates);
router.get("/update/:id", getOneUpdate);
router.post("/update",
body("title").exists().isString(),
body("body").exists().isString(),
body('productId').exists().isString(), createUpdate);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body('status').isIn(['IN_PROGRESS','SHIPPED', 'DELIVERED', 'DEPRECATED']).optional(),
  body("version").optional(),
   updatedUpdate
);
router.delete("/update/:id", deleteUpdate);

//updatePoints

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post("/updatepoint",
 body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isString(),
() => {});
router.put("/updatepoint/:id",
 body('name').optional().isString(),
  body('description').optional().isString(),
() => {});
router.delete("/updatepoint/:id", () => {});

export default router;
