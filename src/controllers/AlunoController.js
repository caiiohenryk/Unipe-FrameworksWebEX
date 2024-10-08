let alunos = [
    {
        id:1,
        nome:"Vitor",
        nota1:9,
        nota2:9,
        media:9,
        situacao:"APROVADO"
    }
];

class AlunoController {
    
    static findAll(req, res) {
        res.json({
            data:alunos
        });
    }

    static send(req, res) {
        const {nome, nota1, nota2} = req.body;
        if (!AlunoController.checarNotas(nota1,nota2)) {
            res.status(400).send({
                status:false,
                message:"Insira notas válidas (0 a 10)"
            })
        }

        const media = AlunoController.calcularMedia(nota1, nota2);
        let aluno = {
            id: alunos.at(-1).id + 1,
            nome:nome,
            nota1:nota1,
            nota2:nota2,
            media:media,
            situacao:AlunoController.checarSituacao(media)
        }
        alunos.push(aluno);

        res.send(200, {
            message:"Usuário adicionado com sucesso",
            aluno:aluno
        })
    }

    static update(req, res) {
        const { nome, nota1, nota2} = req.body;
        if (!AlunoController.checarNotas(nota1,nota2)) {
            res.status(400).send({
                status:false,
                message:"Insira uma notas válidas (0 a 10)"
            })
        }

        const { id } = req.params;
        const media = AlunoController.calcularMedia(nota1, nota2);
        let dbAluno = alunos.find(
            (aluno)=>aluno.id == id
        );

        if (!dbAluno) {
            res.send(404, 
            {
                status: false,
                message:"Aluno não encontrado"
            }
            );
        }
        
        alunos[id-1] = {
            id:id,
            nome:nome,
            nota1:nota1,
            nota2:nota2,
            media:media,
            situacao:AlunoController.checarSituacao(media)
        }

        res.send(200, {
            message:"Aluno atualizado com sucesso!",
            aluno:alunos[id-1]
        })

    }

    static deletar(req, res) {
        let {id} = req.params;
        alunos.splice(id-1, 1);
        res.status(200).send({
            status:true,
            message:"Registro de aluno deletado com sucesso!"
        });
    }

    static getById(req, res) {
        const { id } = req.params;

        let dbAluno = alunos.find(
            (aluno)=>aluno.id == id
        );

        if (!dbAluno) {
            res.status(404).send( 
            {
                status:false,
                message:"Aluno não encontrado"
            }
            );
        }

        res.status(200).send({
            status:true,
            message:"Aluno encontrado!",
            aluno:dbAluno
        });

    }
    
    static checarNotas(nota1, nota2) {
        if (nota1 > 10 || nota1 < 0) return false;
        if (nota2 > 10 || nota2 < 0) return false;
    }

    static calcularMedia(nota1, nota2) {
        return ((nota1+nota2)/2)
    }

    static checarSituacao(media){
        if (media >= 7) return "APROVADO";
        if (media >= 4 && media < 7) return "RECUPERACAO";
        if (media < 4) return "REPROVADO";
    }


}

export default AlunoController;