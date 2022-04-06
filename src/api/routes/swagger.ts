import express from "express";

// import swagger ui
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const router = express.Router();

// options for the route files
const options = {
  swaggerDefinition: {
    info: {
      title: "Face detection API",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/routes/*.ts"],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// serve swagger
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
