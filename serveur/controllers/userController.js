const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// creer un utilisateur
const createUserController = async (req,res) => {

    try {
         // validation
        const {name, email, password,} = req.body
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Tous les champs sont requis"
            })
        }

         // verification si l'email existe
        const existing = await userModel.findOne({email})
        if (existing) {
            return res.status(400).send({
                success: false,
                message: "Cet email existe deja"
            })
        }

         // hasher le mot de passe
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // enregistrer le user
        const user = await userModel.create({
            name,
            email,
            password : hashedPassword,
        })

         // reponse
        res.status(201).send({
            success: true,
            message: "utilisateur cree avec success",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la creation de l'utilisateur. API"
        })
    }
}

const loginUserController = async (req,res) => {
    try {
        // validation
        const {email, password} = req.body
        if (!email || !password) {
           return res.status(400).send({
             success: false,
             message: "Entrez l'email et votre mot de passe",
            });
        }

        //  verification de l'email
         const user = await userModel.findOne({ email });
        if (!user) {
           return res.status(404).send({
             success: false,
             message: "Utilisateur introuvable",
           });
        }

        // comparaison du mot de passe 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           return res.status(401).send({
             success: false,
             message: "Votre mot de passe est incorrect",
           });
        }

        // generer in token
        const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
           expiresIn: "7d",
        });
        user.password = undefined;

        // reponse
        res.status(201).send({
            success: true,
            message:  "Utilisateur connecté avec succès 👤",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la connexion de l'utilisateur. API"
        })
    }
}

const getProfileUserController = async (req,res) => {
    try {
        const user = req.user;

        res.status(200).send({
          success: true,
          message: `Profil utilisateur récupéré avec succès 👤 . Mr ${user.name}`,
          user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la recuperation du profil de l'utilisateur. API"
        })
    }
}

module.exports = { createUserController, loginUserController, getProfileUserController }