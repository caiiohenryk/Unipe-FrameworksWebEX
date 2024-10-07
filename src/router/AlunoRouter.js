import { Router } from "express";
import AlunoController from "../controllers/AlunoController.js";

const router = Router();

router.get("/alunos", AlunoController.findAll);
router.post("/alunos", AlunoController.send);

export default router;