const { randomUUID } = require('crypto')
const express = require('express');
const router = express.Router();
const User = require(".././models/User")


var users = []

router.get("/", async (req, res) => {
    try {
        var users = await User.find();
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.post("/", async (req, res) => {

    var { nome, email } = req.body;

    var user = {
        nome: nome, 
        email: email
    }

    try {
        await User.create(user);
    
        console.log("Usuario adicionado com sucesso!")
        return res.status(201).json(
            {
                mensagem: "Usuario adicionado com sucesso!",
                user: user
            }
        )

    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.put("/:id", async (req, res) => {
    var id = req.params.id
    var { nome, email } = req.body;

    try {
        var user = await User.findOne({"_id": id});
    
        if(!user) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }

        user.nome = nome;
        user.email = email;

        const updateUser = await User.updateOne({ _id: id }, user);

        if (updateUser.matchedCount === 0) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return
        }

        return res.status(200).json(
            {
                mensagem: "Usuario editado com sucesso!",
                user: user
            }
        )
    } catch (error) {
        return res.status(500).json({ error: error });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.status(422).json({ mensagem: "Usuario não encontrado" });
            return;
        }
        await User.deleteOne({ _id: id });
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }

})

module.exports = router;