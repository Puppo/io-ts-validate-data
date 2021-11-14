import express from "express";
import { validator } from "../../validator";
import {
  GetByIdProductParams,
  InsertProductDto,
  ProductFilterQuery,
  UpdateProductDto,
  UpdateProductParams,
} from "./model";
import * as service from "./service";
const route = express.Router();

route
  .get(
    "/:id",
    validator({
      params: GetByIdProductParams,
    }),
    (req, res) => {
      const product = service.getById(req.params.id);
      if (!product)
        return res.status(404).json({
          message: `Not found product with id ${req.params.id}`,
        });
      return res.json(product);
    }
  )
  .get(
    "/",
    validator({
      query: ProductFilterQuery,
    }),
    (req, res) => res.json(service.get(req.query))
  )
  .post(
    "/",
    validator({
      body: InsertProductDto,
    }),
    (req, res) => res.json(service.add(req.body))
  )
  .put(
    "/:id",
    validator({
      body: UpdateProductDto,
      params: UpdateProductParams,
    }),
    (req, res) => {
      const updateProduct = service.update(req.params.id, req.body);
      if (!updateProduct)
        return res.status(404).json({
          message: `Not found product with id ${req.params.id}`,
        });
      return res.json(updateProduct);
    }
  )
  .delete(
    "/:id",
    validator({
      params: UpdateProductParams,
    }),
    (req, res) => {
      const deleteProduct = service.remove(req.params.id);
      if (!deleteProduct)
        return res.status(404).json({
          message: `Not found product with id ${req.params.id}`,
        });
      return res.json(deleteProduct);
    }
  );

export default route;
