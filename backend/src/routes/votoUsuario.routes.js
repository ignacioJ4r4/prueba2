"use strict";
import { Router } from "express";
import { votarVotacion } from "../controllers/votoUsuario.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";

const router = Router();

router.use(authenticateJwt);

// POST /api/votos/:id/votar
router.post("/:id/votar", votarVotacion);

export default router;