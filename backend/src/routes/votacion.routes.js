"use strict";
import { Router } from "express";
import {
    getVotaciones,
    createVotacion,
    votarVotacion,
    marcarComoOrganizada
} from "../controllers/votacion.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

router.use(authenticateJwt);

router.get("/", getVotaciones);
router.post("/", isAdmin, createVotacion);
router.post("/:id/votar", votarVotacion);
router.patch("/:id/organizada", isAdmin, marcarComoOrganizada);

export default router;