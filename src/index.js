require('./db/mongoose');
const express = require('express');
const app = express();
const Blog = require('./db/models/blog');
const Plum = require('./db/models/plumitif');

app.use(express.json());

app.get('/plumitifs', (req, res) => {
    Plum.find({}).limit(20).then(sejs => {
        res.send(sejs);
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



