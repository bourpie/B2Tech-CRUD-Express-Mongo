require('./db/mongoose');
const express = require('express');
const app = express();
const Blog = require('./db/models/blog');
const Plum = require('./db/models/plumitif');
const Dossier = require('./db/models/dossier');

app.use(express.json());

app.get('/plumitifs', (req, res) => {
    Plum.find({}).then(sejs => {
        res.send(sejs);
    }).catch(error => {
        res.status(400).send(error)
    });
})

app.get('/dossiers', (req, res) => {
    Dossier.find({}).then(dossiers => {
        res.send(dossiers);
    }).catch(error => {
        res.status(400).send(error)
    });
})

app.get('/blogs', (req, res) => {
    Blog.find({}).then(blogs => {
        res.send(blogs);
    }).catch(error => {
        res.status(400).send(error)
    });
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then(blog => {
        res.status(201).send(blog);
    }).catch(error => {
        res.status(400).send(error)
    });
})

app.listen(4000, (req, res)=> {
    console.log('App is running on port 4000')
});



