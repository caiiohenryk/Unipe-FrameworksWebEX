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