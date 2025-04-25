import express from "express";
import { upload } from "../configs/multer.js";
import { authSeller } from "../middleware/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";

const productRouter = express.Router();

// FIX 1: `images` should be a string (field name), not a variable
productRouter.post("/add", upload.array("images"), authSeller, addProduct);

// FIX 2: GET by ID should include an ID param in URL
productRouter.get("/list", productList);
productRouter.get("/id/:productId", productById); // example: /id/123
productRouter.patch("/stock", authSeller, changeStock); // PATCH is more appropriate for updates

export default productRouter;
