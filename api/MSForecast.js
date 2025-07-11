class MSForecast {
    constructor() {
        this.temperatura = 22;
        this.humedad = 50;
    }

    upTemp(x) 
    { 
        this.temperatura += x; 
    }

    downTemp(x) 
    { 
        this.temperatura -= x; 
    }

    upHumidity(x) 
    { 
        this.humedad += x; 
    }

    downHumidity(x) 
    { 
        this.humedad -= x; 
    }

    readTemp() 
    {
        return this.temperatura; 
    }

    readHumidity()
    { 
        return this.humedad; 
    }
}

module.exports = MSForecast;
