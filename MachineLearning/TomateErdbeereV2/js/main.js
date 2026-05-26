// Global application state
window.dataPoints = [];
window.nextId = 1;
window.currentMeasurement = null;
window.model = null;
window.neuronModel = null;

function confirmLabel(l) { 
    window.dataPoints.push({
        ...window.currentMeasurement, 
        label: l, 
        id: window.nextId++
    }); 
    
    document.getElementById('label-popup').style.display='none'; 
    refreshApp(); 
}

function removePt(id) { 
    window.dataPoints = window.dataPoints.filter(p => p.id !== id); 
    window.model = null; 
    window.neuronModel = null;
    refreshApp(); 
}

function resetData() { 
    window.dataPoints = []; 
    window.nextId = 1; 
    window.model = null; 
    window.neuronModel = null;
    refreshApp(); 
}

function refreshApp() {
    const cfg = configMap[document.getElementById('mode-select').value];
    const tbody = document.getElementById('table-body'); 
    tbody.innerHTML = "";
    
    window.dataPoints.forEach(pt => { 
        tbody.innerHTML += `<tr>
            <td>${pt.id}</td>
            <td>${pt.f1}</td>
            <td>${pt.f2}</td>
            <td>${pt.label}</td>
            <td><button onclick="removePt(${pt.id})">🗑️</button></td>
        </tr>`; 
    });
    
    document.getElementById('th-f1').innerText = cfg.f1; 
    document.getElementById('th-f2').innerText = cfg.f2;
    document.getElementById('test-f1-label').innerText = cfg.f1; 
    document.getElementById('test-f2-label').innerText = cfg.f2;
    document.getElementById('train-tree-btn').disabled = window.dataPoints.length < 5;
    document.getElementById('train-neuron-btn').disabled = window.dataPoints.length < 5;
}

// Initialize the application after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM event handlers
    document.getElementById('mode-select').addEventListener('change', resetData);
    document.getElementById('train-tree-btn').addEventListener('click', window.trainModel);
    document.getElementById('train-neuron-btn').addEventListener('click', window.trainNeuronModel);
    
    // Initialize the application
    refreshApp();
});