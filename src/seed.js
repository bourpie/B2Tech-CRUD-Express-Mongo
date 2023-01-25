require('./db/mongoose');
const SkateSpot = require("./db/models/seedModel");
const fetch = require("node-fetch");


const url = ['https://data.cityofnewyork.us/resource/pvvr-75zk.json']

let resultData;
let saveCounter = 0;

url.map(async url => {
   try {
      const response = await fetch(url);
      const json = await response.json();
      resultData = [...json];

      for (let i = 0; i < resultData.length; i++) {
         let skateSpot = new SkateSpot({
            name: resultData[i].name,
            description: resultData[i].status,
            location: { 
               coordinates:[
                  resultData[i].polygon.coordinates[0][0][1], 
                  resultData[i].polygon.coordinates[0][0][0]
               ]
            }
         })

         skateSpot.save(() => {
            console.log("saved" + skateSpot)
            
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