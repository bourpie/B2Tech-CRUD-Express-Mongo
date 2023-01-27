# NodeJS, Express, Mongoose and MongoDB

Alimenter une collection MongoDb à partir d'une API externe qui démarre à chaque 30 secondes à l'aide de node-cron

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
2. [Tutoriel B2 Tech](https://www.youtube.com/playlist?list=PLA7e3zmT6XQU_YoMn_Z9vpAOskP9xq57s)