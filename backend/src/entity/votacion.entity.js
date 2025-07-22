"use strict";
import { EntitySchema } from "typeorm";

export const votacionEntity = new EntitySchema({
    name: "votacion",
    tableName: "votaciones",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        title: {
            type: String,  
            nullable: false,
        },
        descripcion: 
    {
            type: String,
            nullable: false,
        },
        votos: {
            type: Number,
            default: 0,
        },
        organizada: {
            type: Boolean,
            nullable: false,
            default: false,
        }, 
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: () => "CURRENT_TIMESTAMP",
        },
    },
});

export default votacionEntity;