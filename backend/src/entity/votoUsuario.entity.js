"use strict";
import { EntitySchema } from "typeorm";

export const votoUsuarioEntity = new EntitySchema({
    name: "votoUsuario",
    tableName: "votos_usuario",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        userId: {
            type: Number,
            nullable: false,
        },
        votacionId: {
            type: Number,
            nullable: false,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        }
    }
});

export default votoUsuarioEntity;