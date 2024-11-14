import { RequestHandler } from "express";
import { connect } from "../database";

declare global {
    namespace Express {
        interface Request {
            episodeId?: number; // Adiciona a propriedade episodeId
        }
    }
}

export const validateAndCreateEpisode: RequestHandler = async (req, res, next) => {
    const { title, date, description } = req.body;

    if (!title || !date || !description) {
         res.status(400).json({ error: "Todos os campos do episódio são obrigatórios." });
         return
    }

    const db = await connect();
    try {
        const result = await db.run(
            `INSERT INTO episodes (title, date, description) VALUES (?, ?, ?)`,
            [title, date, description]
        );

        req.episodeId = result.lastID; // Armazena o ID do episódio na requisição
        next();
    } catch (error) {
        console.error("Error inserting episode:", error);
        res.status(500).json({ error: "Erro ao cadastrar o episódio." });
    }
};
