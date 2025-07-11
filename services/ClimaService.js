const MSForecast = require('../api/MSForecast');
const ClimaModel = require('../models/ClimaModel');

class ClimaService {
    constructor() {
        this.api = new MSForecast();
        this.model = new ClimaModel();
        this.restaurarEstadoDesdeHistorial();
        this.inicializarHistorial();
    }

    restaurarEstadoDesdeHistorial() {
        const historial = this.model.leerHistorial();
        if (historial.length > 0) {
            const ultimo = historial[historial.length - 1];
            const tempActual = this.api.readTemp();
            const diffTemp = ultimo.temperatura - tempActual;
            if (diffTemp > 0) this.api.upTemp(diffTemp);
            else if (diffTemp < 0) this.api.downTemp(Math.abs(diffTemp));
            const humActual = this.api.readHumidity();
            const diffHum = ultimo.humedad - humActual;
            if (diffHum > 0) this.api.upHumidity(diffHum);
            else if (diffHum < 0) this.api.downHumidity(Math.abs(diffHum));
        }
    }

    inicializarHistorial() {
        const historial = this.model.leerHistorial();
        if (historial.length === 0) {
            this.registrar();
        }
    }

    ajustarTemperatura(valor) {
        if (valor > 0) this.api.upTemp(valor);
        else this.api.downTemp(Math.abs(valor));
        return this.registrar();
    }

    ajustarHumedad(valor) {
        if (valor > 0) this.api.upHumidity(valor);
        else this.api.downHumidity(Math.abs(valor));
        return this.registrar();
    }

    registrar() {
        const registro = {
            fecha: new Date().toISOString(),
            temperatura: this.api.readTemp(),
            humedad: this.api.readHumidity()
        };
        this.model.guardarRegistro(registro);
        return this.simularAlertaSiEsNecesario(registro);
    }

    simularAlertaSiEsNecesario(registro) {
        const TEMP_MAX = 30;
        const TEMP_MIN = 10;
        const HUM_MAX = 80;
        const HUM_MIN = 20;
        let alerta = false;
        let mensaje = '';
        if (registro.temperatura > TEMP_MAX) {
            alerta = true;
            mensaje += `Temperatura demasiado alta: ${registro.temperatura}°C. `;
        }
        if (registro.temperatura < TEMP_MIN) {
            alerta = true;
            mensaje += `Temperatura demasiado baja: ${registro.temperatura}°C. `;
        }
        if (registro.humedad > HUM_MAX) {
            alerta = true;
            mensaje += `Humedad demasiado alta: ${registro.humedad}%. `;
        }
        if (registro.humedad < HUM_MIN) {
            alerta = true;
            mensaje += `Humedad demasiado baja: ${registro.humedad}%. `;
        }
        if (alerta) {
            console.log(`ALERTA: Se enviaría un mail a admin@datacenter.com - ${mensaje}`);
            return mensaje;
        }
        return null;
    }

    getActual() {
        return {
            temperatura: this.api.readTemp(),
            humedad: this.api.readHumidity()
        };
    }

    getHistorial() {
        return this.model.leerHistorial();
    }
}

module.exports = ClimaService;
