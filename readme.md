# **Fakembar : Construction et déploiment de l'API**

__1. URL du rendu__

**https://fakembar.onrender.com/api/v1**

__2. Résmé du projet__

Ce repo est utilisé pour déployer la partie back de Fakembar. Projet NodeJS avec approche MVC. Déploiment sur Render.
Api sur port 10000 (défaut Render), si vous souhaitez tester la génération des pages de Pug le fichier server-frontend.js est branché sur le port 8080.

__3. Langages/Frameworks utilisés__

- **Javascript** 
- **NodeJS** : Environnement pour utilision du Javascript Serveur
- **Express** :  Framework de gestion de requêtes HTTP et routing, avec utilitaires 
- **Sequelize** : ORM
- **SQlite** : format de données pour la base de données
- **Swagger** : Documentattion pour les routes de l'API
- Moteur de templates **Pug**
- Déploiment via **Render**

__4. Structure du projet :__

- **./config** : contient les données de configuration pour Sequelize et la documentation Swagger
- **./database** : dossier de stockage de la DB
- **./migrations** : les migrations Serveur sont appliquées ici
- **./public** : contient les éléments statiques à servir au client : JS/Images/etc.
- **./seeders** : seeders pour Sequelize
- **./src** : contient le Model, les routes et les controllers
- **./view** : les vue sont placées ici
- **server-api.js** : fichier qui est responsable de la connexion à l'API. C'est le fichier que le server Render démarre.

__5. Test du projet en local__

    node server-api.js start 
    node server-frontend.js start 

Si tout se passe bien, un log informe que la connection server est bien établie.

__6. Repo front__

https://github.com/AnthonyWGit/fakembar-front

__7. Licence__

MIT
