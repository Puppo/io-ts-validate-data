import express, { Application } from "express";
import homeRoutes from "./home";
import productsRoutes from "./products";

const loadRoutes = (app: Application): void => {
  app.use(express.json());
  app.use("/api/products", productsRoutes);
  app.use("/", homeRoutes);
};

export default loadRoutes;
