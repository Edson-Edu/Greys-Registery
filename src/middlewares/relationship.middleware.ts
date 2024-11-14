import { RequestHandler } from "express";
import { connect } from "../database";

export const validateEpisodeCharacterRelation: RequestHandler = async (req, res, next) => {
    const { episodeId, characterIds } = req.body;
    const db = await connect();

    try {
        // Verifica se o episódio existe
        const episode = await db.get("SELECT * FROM episodes WHERE id = ?", [episodeId]);

        // Verifica se os personagens existem
        const characters = await db.all("SELECT * FROM characters WHERE id IN (?)", [characterIds]);

        if (!episode) {
            res.status(404).json({ error: "Episódio não encontrado." });
            return
        }

        if (characters.length !== characterIds.length) {
             res.status(404).json({ error: "Algum dos personagens não foi encontrado." });
             return
        }

        // Verifica se a relação já existe para cada personagem
        for (const characterId of characterIds) {
            const existingRelation = await db.get(
                "SELECT * FROM episode_characters WHERE episode_id = ? AND character_id = ?",
                [episodeId, characterId]
            );

            if (existingRelation) {
               res.status(400).json({ error: `A relação entre o episódio ${episodeId} e o personagem ${characterId} já existe.` });
               return 
            }
        }

        // Se tudo estiver certo, prossegue
        next();

    } catch (error) {
        console.error("Error validating relation:", error);
        res.status(500).json({ error: "Erro ao validar a relação." });
    }
};
