async function actualizar() {
    const res = await fetch('/clima/actual');
    const data = await res.json();
    document.getElementById('temp').innerText = data.temperatura;
    document.getElementById('hum').innerText = data.humedad;
}

function mostrarAlerta(mensaje) {
    const alertaDiv = document.getElementById('alerta');
    if (mensaje) {
        alertaDiv.innerText = mensaje;
        alertaDiv.style.display = 'block';
        alertaDiv.style.background = 'rgba(255, 60, 60, 0.85)';
        alertaDiv.style.color = '#fff';
        alertaDiv.style.padding = '16px';
        alertaDiv.style.borderRadius = '18px';
        alertaDiv.style.position = 'fixed';
        alertaDiv.style.top = '24px';
        alertaDiv.style.left = '50%';
        alertaDiv.style.transform = 'translateX(-50%)';
        alertaDiv.style.zIndex = '1000';
        setTimeout(() => { alertaDiv.style.display = 'none'; }, 5000);
    } else {
        alertaDiv.style.display = 'none';
    }
}

async function ajustarTemp() {
    const valor = parseInt(document.getElementById('ajusteTemp').value);
    if (isNaN(valor)) return;
    const res = await fetch('/clima/temperatura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor })
    });
    const data = await res.json();
    if (data.alerta) mostrarAlerta(data.alerta);
    actualizar();
    cargarHistorial();
}

async function ajustarHum() {
    const valor = parseInt(document.getElementById('ajusteHum').value);
    if (isNaN(valor)) return;
    const res = await fetch('/clima/humedad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor })
    });
    const data = await res.json();
    if (data.alerta) mostrarAlerta(data.alerta);
    actualizar();
    cargarHistorial();
}

let mostrarTodoHistorial = false;

async function cargarHistorial() {
    try {
        const res = await fetch('/clima/historial');
        const historial = await res.json();
        const lista = document.getElementById('lista-historial');
        lista.innerHTML = '';
        let registrosAMostrar = historial;
        if (!mostrarTodoHistorial && historial.length > 5) {
            registrosAMostrar = historial.slice(-5);
        }
        if (registrosAMostrar.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No hay registros en el historial';
            li.style.fontStyle = 'italic';
            li.style.color = '#666';
            lista.appendChild(li);
            return;
        }
        registrosAMostrar.slice().reverse().forEach(r => {
            const li = document.createElement('li');
            const fecha = new Date(r.fecha).toLocaleString('es-ES');
            li.textContent = `${fecha} → ${r.temperatura}°C / ${r.humedad}%`;
            lista.appendChild(li);
        });
        // Actualizar el texto del botón
        const btnToggle = document.getElementById('btn-toggle-historial');
        if (btnToggle) {
            if (mostrarTodoHistorial) {
                btnToggle.textContent = 'Ver menos';
            } else {
                btnToggle.textContent = 'Ver más';
            }
            btnToggle.style.display = (historial.length > 5) ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error al cargar historial:', error);
        const lista = document.getElementById('lista-historial');
        lista.innerHTML = '<li style="color: red;">Error al cargar el historial</li>';
    }
}

function onActualizarClick(event) {
    actualizar();
}

function onAjustarTempClick(event) {
    ajustarTemp();
}

function onAjustarHumClick(event) {
    ajustarHum();
}

function onToggleHistorialClick() {
    mostrarTodoHistorial = !mostrarTodoHistorial;
    cargarHistorial();
}

