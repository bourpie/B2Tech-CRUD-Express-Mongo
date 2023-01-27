const mongoose = require('mongoose');
const fetch = require("node-fetch");
const cron = require('node-cron');
const Plum = require('./db/models/plumitif');

/**
 * Connection à MongoDb avec Mongoose
 * https://mongoosejs.com/
 */
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/plumitifs').then(() => {
   console.log("Connection à MongoDb réussie");
   mongoose.connection.db.dropCollection('sejs');
   console.log("Collection sejs supprimée"); 
   
}).catch((error) => {
   console.log("Une erreur est survenue lors de la connection à MongoDb", error)
});

/**
 * Démarrer l'importation des données à toutes les 30 seconde avec node-cron
 * https://www.npmjs.com/package/node-cron
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 */
cron.schedule('*/30 * * * * *', () => {
   seed();
   console.log("La tâche d'importation a démarré")
});


function seed() {

   // Mock API (à remplacer par l'url de l'API SEJ)
   const url = ['http://localhost:4000/dossiers']

   let resultData;
   let saveCounter = 0;
   console.time("saveCounter");

   url.map(async url => {

      try {
         const response = await fetch(url);
         const json = await response.json();
         resultData = [...json];

         for (let i = 0; i < resultData.length; i++) {
         let plumitif = new Plum({
               numeroDossier: resultData[i].numeroDossier,
               greffe: resultData[i].greffe,
               juridiction: resultData[i].juridiction,
               annee:resultData[i].annee,
               typeStructure: resultData[i].typeStructure,
            });

            plumitif.save(() => {
               console.log("Dossier importé" + plumitif)
               
               saveCounter++;
         
               if (saveCounter === resultData.length) {

                  mongoose.disconnect()
                     .then(() => {
                        console.log("Données importées dans la collection avec succès");
                        console.log("Déconnection à MongoDb");
                        console.timeEnd("saveCounter");
                     })
                     .catch(error => console.log(error)) 
               }
            });
         }
      } catch (error) {
         console.log(error);
      }
   });
}