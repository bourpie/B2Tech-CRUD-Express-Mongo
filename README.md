# Seed NodeJS, Express, Mongoose and MongoDB

Alimenter une collection MongoDb à partir d'une API externe. 

À l'aide de `node-cron`, un céduleur démarre la tâche d'alimentation toutes les 30 secondes 

**Usage**
1. Installer MongoDb
2. Créer la base de données `plumitifs`
3. Créer les collections `dossiers` et `sejs`
4. Importer dans la collection `dossiers` un dataset de départ
4. Exécuter `npm install`
4. Exécuter `node src/index.js`
5. Exécuter `node src/importSej.js`

**Références :**

1. [Seed MongoDB using external API in Node.js](https://baraksaidoff.medium.com/seed-mongodb-using-external-api-in-node-js-e73f7a85ea5)
2. [Tutoriel NodeJS, Express, Mongoose and MongoDB](https://www.youtube.com/playlist?list=PLA7e3zmT6XQU_YoMn_Z9vpAOskP9xq57s)
3. [Build A Node Cron Scheduler With Node.JS Tutorial](https://www.youtube.com/watch?v=u0Tk8gfXh0M)