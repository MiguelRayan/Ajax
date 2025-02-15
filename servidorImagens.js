const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const diretorioImagens = path.join(__dirname, 'img');
const imagens = fs.readdirSync(diretorioImagens)
  .filter(file => file.startsWith('garfield'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0], 10);
    const numB = parseInt(b.match(/\d+/)[0], 10);
    return numA - numB;
  });

let indiceAtual = 0;

app.get('/imagens', (req, res) => {
  // Retorna a URL da próxima imagem
  res.json({ url: `/imagens/${imagens[indiceAtual]}` });

  indiceAtual = (indiceAtual + 1) % imagens.length;
});

// Serve as imagens estáticas da pasta 'imagens'
app.use('/imagens', express.static(diretorioImagens));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});