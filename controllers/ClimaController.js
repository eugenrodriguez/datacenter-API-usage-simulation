const ClimaService = require('../services/ClimaService');

class ClimaController {
    constructor() {
        this.service = new ClimaService();
    }

    getActual = (req, res) => {
        res.json(this.service.getActual());
    }

    getHistorial = (req, res) => {
        res.json(this.service.getHistorial());
    }

    postTemperatura = (req, res) => {
        const { valor } = req.body;
        const alerta = this.service.ajustarTemperatura(parseInt(valor));
        res.json({ mensaje: 'Temperatura ajustada correctamente', alerta });
    }

    postHumedad = (req, res) => {
        const { valor } = req.body;
        const alerta = this.service.ajustarHumedad(parseInt(valor));
        res.json({ mensaje: 'Humedad ajustada correctamente', alerta });
    }
}

module.exports = ClimaController;
