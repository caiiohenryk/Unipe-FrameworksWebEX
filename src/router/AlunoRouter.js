import { Router } from "express";
import AlunoController from "../controllers/AlunoController.js";

const router = Router();

router.get("/alunos", AlunoController.findAll);
router.get("/alunos/:id", AlunoController.getById);
router.post("/alunos", AlunoController.send);
router.put("/alunos/:id", AlunoController.update);
router.delete("/alunos/:id", AlunoController.deletar);

export default router;