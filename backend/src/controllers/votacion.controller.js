"use strict";
import votacion from "../entity/votacion.entity.js";
import votoUsuario from "../entity/votoUsuario.entity.js";
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

// Votar por una actividad (1 vez por usuario)
export async function votarVotacion(req, res) {
    try {
        const votacionRepository = AppDataSource.getRepository(votacion);
        const votoUsuarioRepository = AppDataSource.getRepository(votoUsuario);
        const { id } = req.params;
        const userId = req.user.id;

        const yaVoto = await votoUsuarioRepository.findOneBy({ userId, votacionId: id });
        if (yaVoto) {
            return res.status(400).json({ message: "Ya has votado por esta actividad." });
        }

        const votacionExistente = await votacionRepository.findOneBy({ id });
        if (!votacionExistente) {
            return res.status(404).json({ message: "Actividad no encontrada." });
        }

        votacionExistente.votos += 1;
        await votacionRepository.save(votacionExistente);

        const nuevoVoto = votoUsuarioRepository.create({ userId, votacionId: id });
        await votoUsuarioRepository.save(nuevoVoto);

        res.status(200).json({ message: "Voto registrado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar el voto." });
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