import { RequestHandler } from "express";
import { connect } from "../database";

declare global {
    namespace Express {
        interface Request {
            characterId?: number; // Adiciona a propriedade characterId
        }
    }
}

export const validateAndCreateCharacter: RequestHandler = async (req, res, next) => {
    const { name } = req.body;

    if (!name) {
         res.status(400).json({ error: "O nome do personagem é obrigatório." });
         return
    }

    const db = await connect();
    try {
        const result = await db.run(
            `INSERT INTO characters (name) VALUES (?)`,
            [name]
        );

        req.characterId = result.lastID; // Armazena o ID do personagem na requisição
        next();
    } catch (error) {
        console.error("Error inserting character:", error);
        res.status(500).json({ error: "Erro ao cadastrar o personagem." });
    }
};
