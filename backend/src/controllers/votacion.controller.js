"use strict";
import votacion from "../entity/votacion.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { createValidation } from "../validations/votacion.validation.js";

// Obtener todas las actividades
export async function getVotaciones(req, res) {
    try {
        const votacionRepository = AppDataSource.getRepository(votacion);
        const votaciones = await votacionRepository.find();
        res.status(200).json({ message: "Votaciones obtenidas correctamente", data: votaciones });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al conseguir votaciones" });
    }
}

// Crear nueva actividad (solo admin)
export async function createVotacion(req, res) {
    try {
        const { error } = createValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const votacionRepository = AppDataSource.getRepository(votacion);
        const { title, descripcion } = req.body;

        const nuevaVotacion = votacionRepository.create({ title, descripcion });
        await votacionRepository.save(nuevaVotacion);

        res.status(201).json({ message: "Votación creada correctamente", data: nuevaVotacion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear votación" });
    }
}

// Marcar como organizada (solo admin)
export async function marcarComoOrganizada(req, res) {
    try {
        const votacionRepository = AppDataSource.getRepository(votacion);
        const { id } = req.params;

        const votacionExistente = await votacionRepository.findOneBy({ id });
        if (!votacionExistente) {
            return res.status(404).json({ message: "Actividad no encontrada." });
        }

        votacionExistente.organizada = true;
        await votacionRepository.save(votacionExistente);

        res.status(200).json({ message: "Actividad marcada como organizada." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la actividad." });
    }
}