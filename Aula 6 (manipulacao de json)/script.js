const fs = require('fs');
const path = require('path');
const express = require('express');
 
const app = express();
 
const port = 3000;
 
const carrosPath = path.join(__dirname, 'carros.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let carrosData = fs.readFileSync(carrosPath, 'utf-8');
let carros = JSON.parse(carrosData);
 
function salvarDados() {
    fs.writeFileSync(carrosPath, JSON.stringify(carros, null, 2));
}

app.get('/adicionar-carro', (req,res) => {
    res.sendFile(path.join(__dirname, 'adicionarcarro.html'));
});

app.post('/adicionar-carro', (req,res) => {
    const novoCarro = req.body;

    if (carros.find(carro => carro.nome.toLowerCase() === novoCarro.nome.toLowerCase())){
        res.send('<h1>Carro ja existe. Nao foi possivel adicionar duplicatas.</h1>');
        return;
    }

    carros.push(novoCarro);

    salvarDados();

    res.send('<h1>Carro adicionado com sucesso!</h1>');
});

app.listen(port, () =>{
    console.log('Servidor iniciado em http://localhost:${port}')
})

