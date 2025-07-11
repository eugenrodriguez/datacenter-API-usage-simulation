const express = require('express');
const path = require('path');
const app = express();
const climaRoutes = require('./routes/climaRoutes');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/clima', climaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
