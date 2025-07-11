const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/registros.json');

class ClimaModel {
    guardarRegistro(registro) {
        const historial = this.leerHistorial();
        historial.push(registro);
        fs.writeFileSync(filePath, JSON.stringify(historial, null, 2));
    }

    leerHistorial() {
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath));
    }
}

module.exports = ClimaModel;
