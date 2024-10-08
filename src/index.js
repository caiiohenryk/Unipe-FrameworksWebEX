import AlunoRouter from './router/AlunoRouter.js'
import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());
app.use(AlunoRouter);

app.listen(port, ()=> {
    console.log(`Server rodando no PORT ${port}`);
});