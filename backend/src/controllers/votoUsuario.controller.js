"use strict";
import votacion from "../entity/votacion.entity.js";
import votoUsuario from "../entity/votoUsuario.entity.js";
import { AppDataSource } from "../config/configDb.js";

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