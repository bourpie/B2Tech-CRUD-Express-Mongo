const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/plumitifs').then(() => {
    console.log("Connection to BD successfull");
   /**
    * TODO
    * Vérifier si la collection existe avant de la supprimer
    */
    mongoose.connection.db.dropCollection('sejs');
    console.log("Collection sejs supprimée"); 
    
}).catch((error) => {
    console.log("Oups ! Une erreur est survenue", error)
});


const Plum = require('./db/models/plumitif');
const fetch = require("node-fetch");

// Mock API (à remplacer par l'url de l'API SEJ)
const url = ['http://localhost:4000/dossiers']

let resultData;
let saveCounter = 0;

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
            etatDossier: resultData[i].etatDossier,
         });

         plumitif.save(() => {
            console.log("Dossier importé" + plumitif)
            
            saveCounter++;
      
            if (saveCounter === resultData.length) {

               mongoose.disconnect()
                  .then(() => {
                     console.log("Collection importée avec succès et déconnection à MongoDb");
                     process.exit()
                  })
                  .catch(error => console.log(error)) 
            }
         });
      }
   } catch (error) {
      console.log(error);
   }
})