"use strict";
import { Router } from "express";
import {
getVotaciones,
createVotacion,
marcarComoOrganizada
} from "../controllers/votacion.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt);

// Solo accesibles por usuarios autenticados
router.get("/", getVotaciones);

// Solo admins pueden crear y marcar
router.post("/", isAdmin, createVotacion);
router.patch("/:id/organizada", isAdmin, marcarComoOrganizada);

export default router;