// Modell-Management für KI-Labor LISA
// Lädt den ML-Algorithmus und verwaltet das Modell

// Lade den ML-Algorithmus
const MLAlgorithm = CARTAlgorithm;
const LRAlgorithm = LogisticRegressionAlgorithm;

// Globale Funktionen für die Verwendung in Event-Listenern
window.trainModel = function() {
    if(window.dataPoints.length < 5) {
        alert('Bitte sammle mindestens 5 Datenpunkte!');
        return;
    }
    
    try {
        // Reset neuron model when training tree
        window.neuronModel = null;
        
        // Trainiere das Modell mit dem ausgewählten Algorithmus
        window.model = MLAlgorithm.train(window.dataPoints);
        
        // Aktualisiere die Baumdarstellung
        updateTreeVisualization();
    } catch(e) {
        console.error('Fehler beim Baum-Training:', e);
        alert('Fehler beim Baum-Training: ' + e.message);
    }
}

window.trainNeuronModel = function() {
    if(window.dataPoints.length < 5) {
        alert('Bitte sammle mindestens 5 Datenpunkte!');
        return;
    }
    
    try {
        console.log('Starte Neuron-Training mit', window.dataPoints.length, 'Datenpunkten');
        
        // Reset tree model when training neuron
        window.model = null;
        
        // Trainiere das logistische Regressionsmodell
        window.neuronModel = LRAlgorithm.train(window.dataPoints);
        
        console.log('Neuron-Modell trainiert:', window.neuronModel);
        
        // Aktualisiere die Visualisierung
        updateNeuronVisualization();
    } catch(e) {
        console.error('Fehler beim Neuron-Training:', e);
        alert('Fehler beim Neuron-Training: ' + e.message);
    }
}

function updateTreeVisualization() {
    if(!window.model) return;
    
    const cfg = configMap[document.getElementById('mode-select').value];
    let s1 = window.model.s1;
    let s2 = window.model.s2;
    
    let f1 = s1.feat === 'f1' ? cfg.f1 : cfg.f2;
    let html = `<strong>WENN</strong> (${f1} < ${s1.val}) {<br>`;
    
    if(calculateGini([s1.groups[0]]) > calculateGini([s1.groups[1]]) && s2) {
        let f2 = s2.feat === 'f1' ? cfg.f1 : cfg.f2;
        html += `&nbsp;&nbsp;<strong>WENN</strong> (${f2} < ${s2.val}) { ⮕ <strong>${MLAlgorithm.getMajorityLabel(s2.groups[0])}</strong> }<br>`;
        html += `&nbsp;&nbsp;<strong>SONST</strong> { ⮕ <strong>${MLAlgorithm.getMajorityLabel(s2.groups[1])}</strong> }<br>`;
    } else { 
        html += `&nbsp;&nbsp;⮕ <strong>${MLAlgorithm.getMajorityLabel(s1.groups[0])}</strong><br>`; 
    }
    
    html += `} <strong>SONST</strong> {<br>`;
    
    if(calculateGini([s1.groups[1]]) > calculateGini([s1.groups[0]]) && s2) {
        let f2 = s2.feat === 'f1' ? cfg.f1 : cfg.f2;
        html += `&nbsp;&nbsp;<strong>WENN</strong> (${f2} < ${s2.val}) { ⮕ <strong>${MLAlgorithm.getMajorityLabel(s2.groups[0])}</strong> }<br>`;
        html += `&nbsp;&nbsp;<strong>SONST</strong> { ⮕ <strong>${MLAlgorithm.getMajorityLabel(s2.groups[1])}</strong> }<br>`;
    } else { 
        html += `&nbsp;&nbsp;⮕ <strong>${MLAlgorithm.getMajorityLabel(s1.groups[1])}</strong><br>`; 
    }
    
    html += `}`;
    document.getElementById('tree-content').innerHTML = html;
}

function updateNeuronVisualization() {
    if(!window.neuronModel) return;
    
    const cfg = configMap[document.getElementById('mode-select').value];
    const w = window.neuronModel.weights;
    
    let html = `<strong>Logistische Regression (Multiclass):</strong><br><br>`;
    html += `<strong>Klassengrenzen (Decision Boundaries):</strong><br>`;
    
    for(let i = 0; i < 3; i++) {
        const label = LRAlgorithm.decodeLabel(i);
        html += `${label}: ${w[i][0].toFixed(3)} + ${w[i][1].toFixed(3)}×${cfg.f1} + ${w[i][2].toFixed(3)}×${cfg.f2}<br>`;
    }
    
    html += `<br><em>Die Klasse mit dem höchsten Wert wird vorhergesagt.</em>`;
    
    document.getElementById('tree-content').innerHTML = html;
}

function predictTest() {
    if(!window.model && !window.neuronModel) {
        alert('Bitte trainiere zuerst ein Modell!');
        return;
    }
    
    let v1 = parseFloat(document.getElementById('test-f1').value);
    let v2 = parseFloat(document.getElementById('test-f2').value);
    
    if(isNaN(v1) || isNaN(v2)) {
        alert('Bitte gib gültige Werte ein!');
        return;
    }
    
    let dataPoint = { f1: v1, f2: v2 };
    
    let result = "Unbekannt";
    
    // Verwende das zuletzt trainierte Modell für die Vorhersage
    if(window.neuronModel) {
        result = LRAlgorithm.predict(window.neuronModel, dataPoint);
    } else if(window.model) {
        result = MLAlgorithm.predict(window.model, dataPoint);
    }
    
    document.getElementById('test-result').innerText = "Ergebnis: " + result;
}

function exportCSV() {
    const cfg = configMap[document.getElementById('mode-select').value];
    let csv = `${cfg.f1},${cfg.f2},Label\n`;
    
    window.dataPoints.forEach(p => { 
        csv += `${p.f1},${p.f2},${p.label}\n`; 
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); 
    a.href = window.URL.createObjectURL(blob); 
    a.download = 'ki_messdaten.csv'; 
    a.click();
}

// Hilfsfunktion für Gini-Koeffizient (wird für Baumvisualisierung benötigt)
function calculateGini(groups) {
    let gini = 0; 
    const total = groups.reduce((a, g) => a + g.length, 0);
    
    groups.forEach(g => {
        if(g.length === 0) return;
        let score = 0;
        ['Erdbeere', 'Cocktailtomate', 'Tomate'].forEach(l => {
            let p = g.filter(d => d.label === l).length / g.length;
            score += p*p;
        });
        gini += (1.0 - score) * (g.length / total);
    });
    
    return gini;
}