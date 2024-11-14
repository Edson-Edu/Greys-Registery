import { Router, json } from "express";
import staticRouter from "./static";
import tokenRouter from "./token";
import userRouter from "./user";
import episodeRouter from "./episode";
import characterRouter from "./character"; // Importa o router de personagens
import episode_character from "./episode_character"

const router = Router();
router.use(json());
router.use("/", staticRouter);
router.use("/token", tokenRouter);
router.use("/user", userRouter);
router.use("/episodes", episodeRouter);
router.use("/characters", characterRouter); // Adiciona o roteador de personagens
router.use("/episode_character", episode_character); 

export default router;
