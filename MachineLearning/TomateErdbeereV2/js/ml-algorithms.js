// Machine Learning Algorithmen für CART-Entscheidungsbaum und Logistische Regression
class CARTAlgorithm {
    static calculateGini(groups) {
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

    static findBestSplit(data) {
        let bestGini = 1, bestSplit = null;
        
        ['f1', 'f2'].forEach(f => {
            let sorted = [...data].sort((a,b) => a[f] - b[f]);
            for(let i=0; i < sorted.length - 1; i++) {
                let mid = (sorted[i][f] + sorted[i+1][f]) / 2;
                let groups = [
                    data.filter(d => d[f] < mid), 
                    data.filter(d => d[f] >= mid)
                ];
                let g = this.calculateGini(groups);
                
                // Margin-Bonus: Bevorzugt Schnitte in der Mitte von Lücken
                let margin = (sorted[i+1][f] - sorted[i][f]);
                let adjGini = g - (margin * 0.0001); 
                
                if(adjGini < bestGini) { 
                    bestGini = adjGini; 
                    bestSplit = { 
                        feat: f, 
                        val: Math.round(mid*10)/10, 
                        groups: groups 
                    }; 
                }
            }
        });
        
        return bestSplit;
    }

    static getMajorityLabel(group) {
        if(!group || group.length === 0) return "Unbekannt";
        let counts = group.reduce((a, d) => { 
            a[d.label] = (a[d.label] || 0) + 1; 
            return a; 
        }, {});
        
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    }

    static train(dataPoints) {
        if(dataPoints.length < 5) return null;
        
        let s1 = this.findBestSplit(dataPoints);
        let uIdx = this.calculateGini([s1.groups[0]]) > this.calculateGini([s1.groups[1]]) ? 0 : 1;
        let s2 = this.findBestSplit(s1.groups[uIdx]);
        
        return {
            s1: { 
                ...s1, 
                l: this.getMajorityLabel(s1.groups[0]), 
                r: this.getMajorityLabel(s1.groups[1]), 
                t: this.getMajorityLabel(s1.groups[1]), 
                b: this.getMajorityLabel(s1.groups[0]) 
            },
            s2: s2 ? { 
                ...s2, 
                scope: uIdx === 0 ? (s1.feat==='f1'?'left':'bottom') : (s1.feat==='f1'?'right':'top'), 
                l: this.getMajorityLabel(s2.groups[0]), 
                r: this.getMajorityLabel(s2.groups[1]), 
                t: this.getMajorityLabel(s2.groups[1]), 
                b: this.getMajorityLabel(s2.groups[0]) 
            } : null
        };
    }

    static predict(model, dataPoint) {
        if(!model) return "Unbekannt";
        
        if(dataPoint[model.s1.feat] < model.s1.val) {
            if(model.s2 && 
               (model.s2.scope==='left' || model.s2.scope==='bottom')) {
                return dataPoint[model.s2.feat] < model.s2.val ? 
                       this.getMajorityLabel(model.s2.groups[0]) : 
                       this.getMajorityLabel(model.s2.groups[1]);
            } else {
                return this.getMajorityLabel(model.s1.groups[0]);
            }
        } else {
            if(model.s2 && 
               (model.s2.scope==='right' || model.s2.scope==='top')) {
                return dataPoint[model.s2.feat] < model.s2.val ? 
                       this.getMajorityLabel(model.s2.groups[0]) : 
                       this.getMajorityLabel(model.s2.groups[1]);
            } else {
                return this.getMajorityLabel(model.s1.groups[1]);
            }
        }
    }
}

class LogisticRegressionAlgorithm {
    static softmax(z) {
        const maxZ = Math.max(...z);
        const expZ = z.map(val => Math.exp(val - maxZ));
        const sumExp = expZ.reduce((a, b) => a + b, 0);
        return expZ.map(val => val / sumExp);
    }
    
    static encodeLabel(label) {
        switch(label) {
            case 'Erdbeere': return 0;
            case 'Cocktailtomate': return 1;
            case 'Tomate': return 2;
            default: return 0;
        }
    }
    
    static decodeLabel(index) {
        switch(index) {
            case 0: return 'Erdbeere';
            case 1: return 'Cocktailtomate';
            case 2: return 'Tomate';
            default: return 'Unbekannt';
        }
    }
    
    static train(dataPoints, learningRate = 0.01, iterations = 500) {
        if(dataPoints.length < 5) return null;
        
        console.log('LogisticRegression.train() aufgerufen mit', dataPoints.length, 'Punkten');
        
        // Normalisiere die Daten für besseres Training
        const f1Values = dataPoints.map(p => p.f1);
        const f2Values = dataPoints.map(p => p.f2);
        const f1Min = Math.min(...f1Values);
        const f1Max = Math.max(...f1Values);
        const f2Min = Math.min(...f2Values);
        const f2Max = Math.max(...f2Values);
        const f1Range = f1Max - f1Min || 1;
        const f2Range = f2Max - f2Min || 1;
        
        // Initialisiere Gewichte für jede Klasse (3 Klassen, 3 Features: bias, f1, f2)
        const weights = [
            [0.1, 0.1, 0.1], // Erdbeere
            [0.1, 0.1, 0.1], // Cocktailtomate
            [0.1, 0.1, 0.1]  // Tomate
        ];
        
        // Trainingsdaten vorbereiten (normalisiert)
        const X = dataPoints.map(p => [
            1, 
            (p.f1 - f1Min) / f1Range, 
            (p.f2 - f2Min) / f2Range
        ]);
        const y = dataPoints.map(p => this.encodeLabel(p.label));
        
        // Gradient Descent
        for(let iter = 0; iter < iterations; iter++) {
            // Für jede Klasse
            for(let classIdx = 0; classIdx < 3; classIdx++) {
                let dw0 = 0, dw1 = 0, dw2 = 0;
                
                for(let i = 0; i < dataPoints.length; i++) {
                    // Berechne Scores für alle Klassen
                    const scores = [
                        weights[0][0]*X[i][0] + weights[0][1]*X[i][1] + weights[0][2]*X[i][2],
                        weights[1][0]*X[i][0] + weights[1][1]*X[i][1] + weights[1][2]*X[i][2],
                        weights[2][0]*X[i][0] + weights[2][1]*X[i][1] + weights[2][2]*X[i][2]
                    ];
                    
                    const probs = this.softmax(scores);
                    const indicator = y[i] === classIdx ? 1 : 0;
                    const error = probs[classIdx] - indicator;
                    
                    dw0 += error * X[i][0];
                    dw1 += error * X[i][1];
                    dw2 += error * X[i][2];
                }
                
                // Gewichte aktualisieren
                weights[classIdx][0] -= learningRate * dw0 / dataPoints.length;
                weights[classIdx][1] -= learningRate * dw1 / dataPoints.length;
                weights[classIdx][2] -= learningRate * dw2 / dataPoints.length;
            }
        }
        
        console.log('Training abgeschlossen. Gewichte:', weights);
        
        return { 
            weights: weights,
            f1Min: f1Min,
            f1Max: f1Max,
            f2Min: f2Min,
            f2Max: f2Max,
            f1Range: f1Range,
            f2Range: f2Range
        };
    }
    
    static predict(model, dataPoint) {
        if(!model || !model.weights) return "Unbekannt";
        
        // Normalisiere den Eingabepunkt
        const x0 = 1;
        const x1 = (dataPoint.f1 - model.f1Min) / model.f1Range;
        const x2 = (dataPoint.f2 - model.f2Min) / model.f2Range;
        
        // Berechne Scores für jede Klasse
        const scores = [
            model.weights[0][0]*x0 + model.weights[0][1]*x1 + model.weights[0][2]*x2,
            model.weights[1][0]*x0 + model.weights[1][1]*x1 + model.weights[1][2]*x2,
            model.weights[2][0]*x0 + model.weights[2][1]*x1 + model.weights[2][2]*x2
        ];
        
        // Softmax anwenden
        const probs = this.softmax(scores);
        
        console.log('Vorhersage:', dataPoint, 'Scores:', scores, 'Probs:', probs);
        
        // Klasse mit höchster Wahrscheinlichkeit auswählen
        const maxProbIdx = probs.indexOf(Math.max(...probs));
        
        return this.decodeLabel(maxProbIdx);
    }
}