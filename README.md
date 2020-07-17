## Projet full stack Wiki

Vivien DI BATTISTA<br />
Jérémy ALLIES<br />

La partie back développée en nodejs se trouve dans le répertoire /api et tourne sous le port 8000<br />
Pour lancer le serveur : 

### `node server.js`

La projet React tourne sur le port 3000 se lance avec la commande suivante : 

### `npm start`

Pour accéder à l'application il suffit d'ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## API 

La base de données MongoDB peut être initialisé avec la requête GET suivante : localhost:8000/setup<br />

Les requêtes de l'API : <br />
- GET ALL : localhost:8000/article <br />
- GET ONE : localhost:8000/article/:id <br />
- GET BY category : localhost:8000/articlebycat/:categorie <br />
- GET BY titre : localhost:8000/articlebytitre/:titre <br />
- GET BY contenu : localhost:8000/articlebycontenu/:contenu <br />
- POST (insert) : localhost:8000/article <br />
- PUT (update) : localhost:8000/article/:id <br />
- DELETE (delete) : localhost:8000/article/:id <br />

## Partie front

Les fonctionnalités de l'application sont les suivantes : <br />
- Voir tous les articles <br />
- Ajout d'un article <br />