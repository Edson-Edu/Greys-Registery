import { Router } from "express";
import * as characterMiddleware from "../middlewares/character.middlware";
import { connect } from "../database";

const router = Router();

// Rota para criar um personagem
router.post("/", characterMiddleware.validateAndCreateCharacter, (req, res) => {
    res.status(201).json({ id: req.characterId });
});

// Rota para listar personagens
router.get("/", async (req, res) => {
    const db = await connect();
    const characters = await db.all("SELECT * FROM characters");
    res.status(200).json(characters);
});

// Rota para obter episódios de um personagem
router.get("/:id/episodes", async (req, res) => {
    const { id } = req.params;
    const db = await connect();

    const episodes = await db.all(`
        SELECT episodes.* FROM episodes
        JOIN episode_characters ON episodes.id = episode_characters.episode_id
        WHERE episode_characters.character_id = ?
    `, [id]);

    res.status(200).json(episodes);
});

export default router;
