const configMap = {
    'A': {f1: 'Gewicht', f1Unit: 'g', f2: 'Vitamin C', f2Unit: 'mg', m1: 200, m2: 40},
    'B': {f1: 'Zucker', f1Unit: '%', f2: 'Gewicht', f2Unit: 'g', m1: 10, m2: 200},
    'C': {f1: 'Vitamin C', f1Unit: 'mg', f2: 'Zucker', f2Unit: '%', m1: 40, m2: 10}
};

const collectSketch = (p) => {
    let items = []; 
    let dragItem = null;

    p.setup = () => { 
        p.createCanvas(950, 220).parent('collect-area'); 
        spawn(); 
    };

    p.draw = () => {
        p.background(255);
        p.fill(245); 
        p.noStroke();
        p.rect(20, 20, 300, 85, 5); 
        p.rect(20, 115, 300, 85, 5); 
        p.rect(630, 20, 300, 180, 5);
        p.fill(200, 225, 255, 180); 
        p.stroke(100, 150, 255); 
        p.strokeWeight(2);
        p.rect(375, 40, 200, 140, 10);
        p.stroke(160, 190, 255); 
        p.strokeWeight(1);
        for(let i=20; i<=200; i+=20) p.line(375+i, 40, 375+i, 180);
        for(let j=20; j<=140; j+=20) p.line(375, 40+j, 575, 40+j);
        p.noStroke(); 
        p.fill(80); 
        p.textSize(10); 
        p.textAlign(p.CENTER);
        p.text("ERDBEEREN", 170, 95); 
        p.text("COCKTAILTOMATEN", 170, 190); 
        p.text("NORMALE TOMATEN", 780, 190);
        p.fill(30, 80, 180); 
        p.textStyle(p.BOLD); 
        p.text("MESSFENSTER", 475, 115); 
        p.textStyle(p.NORMAL);
        
        items.forEach(it => { 
            p.textSize(it.type === 'Tomate' ? 36 : 24); 
            p.textAlign(p.CENTER, p.CENTER);
            p.text(it.type === 'Erdbeere' ? '🍓' : '🍅', it.x, it.y); 
        });
    };

    p.mousePressed = () => { 
        items.forEach(it => { 
            if(p.dist(p.mouseX, p.mouseY, it.x, it.y) < 25) dragItem = it; 
        }); 
    };

    p.mouseDragged = () => { 
        if(dragItem) { 
            dragItem.x = p.mouseX; 
            dragItem.y = p.mouseY; 
        } 
    };

    p.mouseReleased = () => {
        if(dragItem && dragItem.x > 375 && dragItem.x < 575 && dragItem.y > 40 && dragItem.y < 180) {
            let z, g, v;
            if(dragItem.type === 'Erdbeere') { 
                z = p.random(4, 6); 
                g = p.random(11, 14); 
                v = p.random(7.5, 9.5); 
            }
            else if(dragItem.type === 'Cocktail') { 
                z = p.random(3.5, 5); 
                g = p.random(15, 25); 
                v = p.random(4, 4.5); 
            }
            else { 
                z = p.random(2, 4); 
                g = p.random(85, 190); 
                v = p.random(26, 34); 
            }
            
            let mode = document.getElementById('mode-select').value;
            let currentMeasurement = {};
            if(mode === 'A') currentMeasurement = { f1: g, f2: v };
            else if(mode === 'B') currentMeasurement = { f1: z, f2: g };
            else currentMeasurement = { f1: v, f2: z };
            
            Object.keys(currentMeasurement).forEach(k => 
                currentMeasurement[k] = Math.round(currentMeasurement[k] * 10) / 10
            );
            
            window.currentMeasurement = currentMeasurement;
            document.getElementById('label-popup').style.display = 'block';
            document.getElementById('label-popup').style.left = (p.mouseX + 10) + "px"; 
            document.getElementById('label-popup').style.top = (p.mouseY - 10) + "px";
        }
        
        if(dragItem) { 
            dragItem.x = dragItem.ox; 
            dragItem.y = dragItem.oy; 
            dragItem = null; 
        }
    };

    function spawn() {
        for(let i=0; i<6; i++) { 
            items.push({
                x: 60 + i*40, 
                y: 55, 
                ox: 60+i*40, 
                oy: 55, 
                type: 'Erdbeere'
            }); 
            items.push({
                x: 60 + i*40, 
                y: 150, 
                ox: 60+i*40, 
                oy: 150, 
                type: 'Cocktail'
            }); 
        }
        for(let i=0; i<4; i++) 
            items.push({
                x: 680 + i*60, 
                y: 100, 
                ox: 680+i*60, 
                oy: 100, 
                type: 'Tomate'
            });
    }
};

// Initialize the sketch
new p5(collectSketch);