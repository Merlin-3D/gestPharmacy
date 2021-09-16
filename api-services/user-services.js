const bcrypt = require("bcryptjs");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = process.env;

exports.createUser = async (req, res, next) => {

    try {
        const { nom, email, password, telephone } = req.body;
        if (!(email && password && nom)) {
            res.status(400).send("Toutes les entrées sont obligatoires");
        }

        const checkNom = await User.findOne({ nom });
        const checkEmail = await User.findOne({ email });
        if (checkNom) {
            return res.status(409).send("L'utilisateur avec ce nom existe déjà.");
        }
        if (checkEmail) {
            return res.status(409).send("L'utilisateur avec ce mail existe déjà.");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nom,
            telephone,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        return res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        // Get user input
        const { nom, password } = req.body;

        // Validate user input
        if (!(nom && password)) {
            res.status(400).send("Toutes les entrées sont obligatoires");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ nom });

        if (user) {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de passe incorrect!",
                });
            }

            const token = jwt.sign(
                { user_id: user._id, nom },
                config.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            return res.status(200).send({
                user: user,
                token: token,
            });

        }
        res.status(400).send("Les informations d'identification invalides");
    } catch (err) {
        console.log(err);
    }
}