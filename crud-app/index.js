const express = require('express')
const mongoose = require('mongoose')

const porta = 8080

const app = express()
app.use(express.json())

const usuarioRouter = require('./controllers/userController');
app.use('/users', usuarioRouter);


mongoose.connect("mongodb+srv://admin:admin@crud-app.xpypfmp.mongodb.net/CRUD_APP?retryWrites=true&w=majority&appName=CRUD-APP")
    .then(() => {
        app.listen(porta, () => {
            console.log('Conectado ao mongoDB');
            console.log(`Servidor iniciado na porta ${porta}`);
        })
    })
    .catch((err) => {
        console.log('Erro ao conectar ao mongoDB');
        console.log(err);
    });