import { Router } from "express";
import { connect } from "../database";

const router = Router();

// Rota para relacionar um episódio e um personagem
router.post("/", async (req, res) => {
    const { episodeId, characterIds } = req.body;

    console.log({episodeId, characterIds})

    const db = await connect();

    try {
        const result = await db.run(
            `INSERT INTO episode_characters (episode_id, character_id) VALUES (?, ?)`,
            [episodeId, characterIds[0]]
        );
        res.status(201).json({ id: result.lastID });
    } catch (error) {
        console.error("Error associating episode and character:", error);
        res.status(500).json({ error: "Erro ao associar episódio e personagem." });
    }
});

export default router;
