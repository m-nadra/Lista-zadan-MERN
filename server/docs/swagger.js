import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

const router = Router();

router.use("/docs", serve);
router.get("/docs", setup(swaggerDocument));

export default router;
