const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let contador = { sim: 0, nao: 0 };

app.get('/contador', (req, res) => {
    res.json(contador);
});

app.post('/contador', (req, res) => {
    let { sim, nao } = req.body;

    sim = parseInt(sim) || 0;
    nao = parseInt(nao) || 0;

    contador.sim += sim;
    contador.nao += nao;

    console.log(`Recebido: SIM=${sim}, NÃO=${nao}`);

    res.json(contador);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));