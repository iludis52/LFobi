function getColor(l) {
    if(l==='Erdbeere') return 'rgba(100, 255, 100, 0.3)';
    if(l==='Cocktailtomate') return 'rgba(255, 200, 0, 0.3)';
    if(l==='Tomate') return 'rgba(255, 100, 100, 0.3)';
    return 'rgba(200,200,200,0.1)';
}

function getColorForClass(classIdx) {
    if(classIdx === 0) return 'rgba(100, 255, 100, 0.3)'; // Erdbeere
    if(classIdx === 1) return 'rgba(255, 200, 0, 0.3)';   // Cocktailtomate
    if(classIdx === 2) return 'rgba(255, 100, 100, 0.3)'; // Tomate
    return 'rgba(200,200,200,0.1)';
}

const plotSketch = (p) => {
    p.setup = () => { 
        p.createCanvas(430, 400).parent('scatterplot-container'); 
    };
    
    p.draw = () => {
        p.background(255); 
        let cfg = configMap[document.getElementById('mode-select').value];
        let m1 = cfg.m1, m2 = cfg.m2;
        
        // Grid lines
        p.stroke(240); 
        for(let i=0; i<=100; i+=10) { 
            let x = p.map(i, 0, 100, 50, 400); 
            let y = p.map(i, 0, 100, 350, 20); 
            p.line(x, 20, x, 350); 
            p.line(50, y, 400, y); 
        }
        
        // Axes
        p.stroke(0); 
        p.line(50, 350, 400, 350); 
        p.line(50, 350, 50, 20);
        
        // Axis labels
        p.noStroke(); 
        p.fill(100); 
        p.textSize(9);
        for(let i=0; i<=100; i+=20) { 
            p.textAlign(p.CENTER, p.TOP); 
            p.text(Math.round(i/100*m1), p.map(i,0,100,50,400), 355); 
            p.textAlign(p.RIGHT, p.MIDDLE); 
            p.text(Math.round(i/100*m2), 45, p.map(i,0,100,350,20)); 
        }
        
        p.fill(0); 
        p.textSize(10); 
        p.textAlign(p.CENTER); 
        p.text(cfg.f1 + " (" + cfg.f1Unit + ")", 225, 385);
        p.push(); 
        p.translate(12, 185); 
        p.rotate(-p.HALF_PI); 
        p.text(cfg.f2 + " (" + cfg.f2Unit + ")", 0, 0); 
        p.pop();
        
        // Draw model regions if available
        if(window.neuronModel) {
            // Draw logistic regression decision boundaries
            p.noStroke();
            const model = window.neuronModel;
            const step = 5; // Resolution for drawing
            
            for(let px = 50; px < 400; px += step) {
                for(let py = 20; py < 350; py += step) {
                    // Convert pixel coordinates to data values
                    const f1 = p.map(px, 50, 400, 0, m1);
                    const f2 = p.map(py, 350, 20, 0, m2);
                    
                    // Normalize
                    const x1 = (f1 - model.f1Min) / model.f1Range;
                    const x2 = (f2 - model.f2Min) / model.f2Range;
                    
                    // Calculate scores for each class
                    const scores = [
                        model.weights[0][0] + model.weights[0][1]*x1 + model.weights[0][2]*x2,
                        model.weights[1][0] + model.weights[1][1]*x1 + model.weights[1][2]*x2,
                        model.weights[2][0] + model.weights[2][1]*x1 + model.weights[2][2]*x2
                    ];
                    
                    // Softmax
                    const maxScore = Math.max(...scores);
                    const expScores = scores.map(s => Math.exp(s - maxScore));
                    const sumExp = expScores.reduce((a, b) => a + b, 0);
                    const probs = expScores.map(e => e / sumExp);
                    
                    // Find class with highest probability
                    const maxClass = probs.indexOf(Math.max(...probs));
                    
                    p.fill(getColorForClass(maxClass));
                    p.rect(px, py, step, step);
                }
            }
        } else if(window.model) {
            // Draw CART decision tree regions
            p.noStroke();
            let s1 = window.model.s1; 
            let s2 = window.model.s2;
            
            if(s1.feat === 'f1') {
                let x = p.map(s1.val, 0, m1, 50, 400);
                p.fill(getColor(s1.l)); 
                p.rect(50, 20, x-50, 330);
                p.fill(getColor(s1.r)); 
                p.rect(x, 20, 400-x, 330);
                
                if(s2) {
                    let sideX = s2.scope === 'left' ? 50 : x;
                    let sideW = s2.scope === 'left' ? x - 50 : 400 - x;
                    
                    if(s2.feat === 'f2') {
                        let y = p.map(s2.val, 0, m2, 350, 20);
                        p.fill(getColor(s2.t)); 
                        p.rect(sideX, 20, sideW, y-20);
                        p.fill(getColor(s2.b)); 
                        p.rect(sideX, y, sideW, 350-y);
                        p.stroke(180); 
                        p.drawingContext.setLineDash([4,4]); 
                        p.line(sideX, y, sideX+sideW, y);
                    } else {
                        let sx2 = p.map(s2.val, 0, m1, 50, 400);
                        p.fill(getColor(s2.l)); 
                        p.rect(sideX, 20, sx2-sideX, 330);
                        p.fill(getColor(s2.r)); 
                        p.rect(sx2, 20, sideX+sideW-sx2, 330);
                        p.stroke(180); 
                        p.drawingContext.setLineDash([4,4]); 
                        p.line(sx2, 20, sx2, 350);
                    }
                }
                
                p.stroke(180); 
                p.drawingContext.setLineDash([4,4]); 
                p.line(x, 20, x, 350);
            } else {
                let y = p.map(s1.val, 0, m2, 350, 20);
                p.fill(getColor(s1.t)); 
                p.rect(50, 20, 350, y-20);
                p.fill(getColor(s1.b)); 
                p.rect(50, y, 350, 350-y);
                
                if(s2) {
                    let sideY = s2.scope === 'top' ? 20 : y;
                    let sideH = s2.scope === 'top' ? y - 20 : 350 - y;
                    
                    if(s2.feat === 'f1') {
                        let x = p.map(s2.val, 0, m1, 50, 400);
                        p.fill(getColor(s2.l)); 
                        p.rect(50, sideY, x-50, sideH);
                        p.fill(getColor(s2.r)); 
                        p.rect(x, sideY, 400-x, sideH);
                        p.stroke(180); 
                        p.drawingContext.setLineDash([4,4]); 
                        p.line(x, sideY, x, sideY+sideH);
                    } else {
                        let sy2 = p.map(s2.val, 0, m2, 350, 20);
                        p.fill(getColor(s2.t)); 
                        p.rect(50, sideY, 350, sy2-sideY);
                        p.fill(getColor(s2.b)); 
                        p.rect(50, sy2, 350, sideY+sideH-sy2);
                        p.stroke(180); 
                        p.drawingContext.setLineDash([4,4]); 
                        p.line(50, sy2, 400, sy2);
                    }
                }
                
                p.stroke(180); 
                p.drawingContext.setLineDash([4,4]); 
                p.line(50, y, 400, y);
            }
            
            p.drawingContext.setLineDash([]);
        }
        
        // Draw data points
        window.dataPoints.forEach(pt => {
            let x = p.map(pt.f1, 0, m1, 50, 400); 
            let y = p.map(pt.f2, 0, m2, 350, 20);
            p.textAlign(p.CENTER, p.CENTER); 
            p.textSize(pt.label==='Tomate'?22:16);
            p.text(pt.label==='Erdbeere'?'🍓':'🍅', x, y);
            p.fill(0); 
            p.textSize(9); 
            p.text(pt.id, x+12, y+10);
        });
    };
};

// Initialize the sketch
new p5(plotSketch);