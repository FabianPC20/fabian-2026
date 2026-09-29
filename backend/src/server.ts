import express = require('express');
import cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/api/hola', (req, res) => {
    res.json({
        mensaje: 'Hola desde Express'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});