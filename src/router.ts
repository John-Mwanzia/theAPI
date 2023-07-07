import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

// Product

router.get("/product", (req, res) => {
  res.json({
    message: "message",
  });
});
router.get("/product/:id", () => {});
router.post("/product", body("name").isString(), handleInputErrors, () => {});
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/product/:id", () => {});

//update

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post("/update",
body("title").exists().isString(),
body("body").exists().isString(),
() => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body('status').isIn(['IN_PROGRESS','SHIPPED', 'DELIVERED', 'DEPRECATED']),
  body("version").optional(),
  () => {}
);
router.delete("/update/:id", () => {});

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
