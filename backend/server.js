import express from 'express';
import data from './data.js';
const app = express();
const hostName = 'localhost';
const port = 5000;

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.get('/', (req, res) => {
    res.send('server is ready')
});

app.listen(port, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});