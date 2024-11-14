import { Router } from "express";
import * as episodeMiddleware from "../middlewares/episode.middleware";
import { connect } from "../database";

const router = Router();

// Rota para criar um episódio
router.post("/", episodeMiddleware.validateAndCreateEpisode, (req, res) => {
    res.status(201).json({ id: req.episodeId });
});



// Rota para listar episódios
router.get("/", async (req, res) => {
    const db = await connect();
    const episodes = await db.all("SELECT * FROM episodes");
    res.status(200).json(episodes);
});

// Rota para obter personagens de um episódio
router.get("/:id/characters", async (req, res) => {
    const { id } = req.params;
    const db = await connect();

    const characters = await db.all(`
        SELECT characters.* FROM characters
        JOIN episode_characters ON characters.id = episode_characters.character_id
        WHERE episode_characters.episode_id = ?
    `, [id]);

    res.status(200).json(characters);
});

export default router;
