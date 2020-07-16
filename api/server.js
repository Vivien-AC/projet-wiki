var express = require('express')
var cors = require('cors')
var app = express()
var port = 8000
var hostname = 'localhost'
var MongoClient = require('mongodb').MongoClient;

app.use(express.json())
app.use(cors())


// Connexion à la base de données
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;
    else {
        var db = client.db('wiki');
        var ObjectId = require('mongodb').ObjectId; // Récupération de l'object id
        var collection = db.collection('article');// Liste des points d'entrée

        app.route('/setup')
            .get(function (req, res) { // SETUP the database
                try {
                    collection.insertMany([
                        {
                            titre: "Article commerce",
                            contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            categorie: "commerce",
                            tags: "informatique, business",
                            version: 1
                        },
                        {
                            titre: "Article cuisine",
                            contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            categorie: "cuisine",
                            tags: "recette, gout",
                            version: 1
                        },
                        {
                            titre: "Article politique",
                            contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            categorie: "politique",
                            tags: "elections, lois",
                            version: 1
                        },
                        {
                            titre: "Article économie",
                            contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            categorie: "economie",
                            tags: "bourse, business",
                            version: 1
                        },
                        {
                            titre: "Article religion",
                            contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                            categorie: "religion",
                            tags: "religion, tradition",
                            version: 1
                        },
                    ]);
                } catch (e) {
                    console.log(e)
                }
            })

        app.route('/article')
            .get(function (req, res) { // GET all
                collection.find({}).toArray(function (err, result) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })

        app.route('/article/:id')
            .get(function (req, res) {// GET one
                collection.findOne({ _id: new ObjectId(req.params.id) }, function (err, result
                ) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })

        app.route('/articlebycat/:categorie')
            .get(function (req, res) {// GET by categorie
                collection.find({ "categorie": req.params.categorie }).toArray(function (err, result) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })


        app.route('/articlebytitre/:titre')
            .get(function (req, res) {// GET by titre
                collection.find({ "titre": new RegExp(req.params.titre) }).toArray(function (err, result) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })

        app.route('/articlebycontenu/:contenu')
            .get(function (req, res) {// GET by contenu
                collection.find({ "titre": new RegExp(req.params.contenu) }).toArray(function (err, result) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })

        app.route('/article')
            .post(function (req, res, next) { // INSERT
                collection.insert({ "titre": req.body.titre, "contenu": req.body.contenu, "categorie": req.body.categorie, "tags": req.body.tags, "version": req.body.version }, function (err, result
                ) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })


        app.route('/article/:id')
            .put(function (req, res, next) { // UPDATE
                collection.update({ _id: new ObjectId(req.params.id) }, { $set: { "titre": req.body.titre, "contenu": req.body.contenu, "categorie": req.body.categorie, "tags": req.body.tags, "version": req.body.version } }, function (err, result
                ) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })

        app.route('/article/:id')
            .delete(function (req, res, next) { // DELETE
                collection.deleteOne({ _id: new ObjectId(req.params.id) }, function (err, result
                ) {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(result))
                })
            })

        app.listen(port, hostname, function () {
            console.log('Le serveur tourne sur l\'adresse : http://' + hostname + ':' + port);
        });
    }
})