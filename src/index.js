require('./db/mongoose');
const express = require('express');
const app = express();
const Plum = require('./db/models/plumitif');
const Dossier = require('./db/models/dossier');

app.use(express.json());

/**
 * Data locale
 * http://localhost:4000/plumitifs
 * renvoie la collection MongoDb plumitifs/sejs
 */
app.get('/plumitifs', (req, res) => {
    Plum.find({}).then(sejs => {
        res.send(sejs);
    }).catch(error => {
        res.status(400).send(error)
    });
})

/**
 * Mock pour simuler l'API SEJ
 * http://localhost:4000/dossier
 * renvoie la collection MongoDb plumitifs/dossiers
 */
app.get('/dossiers', (req, res) => {
    Dossier.find({}).then(dossiers => {
        res.send(dossiers);
    }).catch(error => {
        res.status(400).send(error)
    });
})

app.listen(4000, (req, res)=> {
    console.log('App is running on port 4000')
});



