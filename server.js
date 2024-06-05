const next = require('next');
const express = require('express');
const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/api', (req,res) => {
        res.json(({message:"Hello World"}))
    });
    
    server.all('*', (req, res) => {
        return handle(req,res);
    })
    const port = process.env.PORT || 5000;
    server.listen(port, (err) => {
       if (err) throw err;
       console.log(`Server running on port ${port}`)
    });
}).catch((err) => {
    console.error('Error starting server:', err)
})