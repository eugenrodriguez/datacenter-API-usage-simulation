function main() {
    document.getElementById('btn-actualizar').addEventListener('click', onActualizarClick);
    document.getElementById('btn-ajustar-temp').addEventListener('click', onAjustarTempClick);
    document.getElementById('btn-ajustar-hum').addEventListener('click', onAjustarHumClick);
    document.getElementById('btn-toggle-historial').addEventListener('click', onToggleHistorialClick);
    actualizar();
    cargarHistorial();
}

window.onload = main; 