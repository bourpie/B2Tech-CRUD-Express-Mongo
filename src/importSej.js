require('./db/mongoose');
const Plum = require('./db/models/plumitif');
const fetch = require("node-fetch");


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
         });

         plumitif.save(() => {
            console.log("saved" + plumitif)
            
            saveCounter++;
      
            if (saveCounter === resultData.length) {
               console.log("saved succesfully")
            }

         });
      }
   } catch (error) {
      console.log(error);
   }
})