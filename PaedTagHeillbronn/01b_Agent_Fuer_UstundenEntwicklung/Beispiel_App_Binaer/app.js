"use strict";

(() => {
    // --- 1. Pure Functions (Konvertierungslogik) ---
    const isValidDec = (val) => /^\d*$/.test(val);
    const isValidHex = (val) => /^[0-9A-Fa-f]*$/.test(val);
    const isValidBin = (val) => /^[01]*$/.test(val);

    const decToHex = (dec) => parseInt(dec, 10).toString(16).toUpperCase();
    const decToBin = (dec) => parseInt(dec, 10).toString(2);
    const hexToDec = (hex) => parseInt(hex, 16).toString(10);
    const binToDec = (bin) => parseInt(bin, 2).toString(10);

    // --- 2. DOM Elemente Referenzen ---
    const els = {
        tabs: {
            converter: document.getElementById('tab-converter'),
            quiz: document.getElementById('tab-quiz')
        },
        views: {
            converter: document.getElementById('view-converter'),
            quiz: document.getElementById('view-quiz')
        },
        inputs: {
            dec: document.getElementById('input-dec'),
            hex: document.getElementById('input-hex'),
            bin: document.getElementById('input-bin')
        },
        errors: {
            dec: document.getElementById('error-dec'),
            hex: document.getElementById('error-hex'),
            bin: document.getElementById('error-bin'),
            quiz: document.getElementById('error-quiz')
        },
        bits: Array.from(document.querySelectorAll('.bit-btn')),
        quiz: {
            difficulty: document.getElementById('quiz-difficulty'),
            question: document.getElementById('quiz-question'),
            answer: document.getElementById('quiz-answer'),
            btnCheck: document.getElementById('btn-check'),
            btnNext: document.getElementById('btn-next'),
            feedback: document.getElementById('quiz-feedback')
        },
        refTableBody: document.getElementById('ref-tbody')
    };

    // --- 3. App State ---
    let currentDecValue = null; // Wertbereich 0-255 oder null
    let quizState = {
        targetValueDec: null,
        targetSys: null,
        targetValueStr: null
    };

    // --- 4. Konverter & Live-Sync ---
    const updateBitsUI = () => {
        const binStr = currentDecValue !== null ? currentDecValue.toString(2).padStart(8, '0') : "00000000";
        els.bits.forEach((btn, index) => {
            const bitValue = binStr[index];
            btn.dataset.state = bitValue;
            btn.querySelector('.bit-value').textContent = bitValue;
            const weight = btn.dataset.weight;
            btn.setAttribute('aria-label', `Bit mit Wertigkeit ${weight}, aktuell ${bitValue}`);
        });
    };

    const updateAllFields = (sourceField, value) => {
        if (value === "") {
            els.inputs.dec.value = ""; els.inputs.hex.value = ""; els.inputs.bin.value = "";
            currentDecValue = null;
            updateBitsUI();
            return;
        }

        let decVal = 0;
        if (sourceField === 'dec') decVal = parseInt(value, 10);
        else if (sourceField === 'hex') decVal = parseInt(hexToDec(value), 10);
        else if (sourceField === 'bin') decVal = parseInt(binToDec(value), 10);

        currentDecValue = decVal;

        // Synchronisiere alle anderen Felder (Kanonische Anzeige)
        if (sourceField !== 'dec') els.inputs.dec.value = decVal.toString(10);
        if (sourceField !== 'hex') els.inputs.hex.value = decToHex(decVal);
        if (sourceField !== 'bin') els.inputs.bin.value = decToBin(decVal);

        // Entferne führende Nullen / fixiere Case für Quellfeld (außer bei leerer/laufender Eingabe)
        if (sourceField === 'dec') els.inputs.dec.value = decVal.toString(10);
        if (sourceField === 'hex') els.inputs.hex.value = decToHex(decVal);

        updateBitsUI();
    };

    const handleInput = (field) => (e) => {
        let val = e.target.value;
        let isValidChar = true;

        // Prüfe auf unerlaubte Zeichen und blockiere sie sofort
        if (field === 'dec' && !isValidDec(val)) isValidChar = false;
        if (field === 'hex' && !isValidHex(val)) isValidChar = false;
        if (field === 'bin' && !isValidBin(val)) isValidChar = false;

        if (!isValidChar) {
            // Bereinige das Feld
            if(field === 'dec') val = val.replace(/[^\d]/g, '');
            if(field === 'hex') val = val.replace(/[^0-9A-Fa-f]/g, '');
            if(field === 'bin') val = val.replace(/[^01]/g, '');
            e.target.value = val;
            
            // Setze roten Rand + Hilfetext
            els.inputs[field].classList.add('invalid');
            if (field === 'dec') els.errors[field].textContent = "Nur Ziffern 0–9 erlaubt.";
            if (field === 'hex') els.errors[field].textContent = "Nur 0–9 und A–F erlaubt.";
            if (field === 'bin') els.errors[field].textContent = "Nur Ziffern 0 und 1 erlaubt.";
            return; // Abbruch, bis Eingabe wieder gültig
        }

        // Wertebereich prüfen (0 - 255)
        let numDec = val === "" ? null : parseInt(field === 'hex' ? hexToDec(val) : field === 'bin' ? binToDec(val) : val, 10);
        
        if (numDec !== null && numDec > 255) {
            els.inputs[field].classList.add('invalid');
            els.errors[field].textContent = "Wert muss zwischen 0 und 255 liegen.";
            return; // Blockiere Update der anderen Felder
        }

        // Alles gültig: Reset Fehler UI und Update anstoßen
        els.inputs[field].classList.remove('invalid');
        els.errors[field].textContent = "";
        updateAllFields(field, val);
    };

    els.inputs.dec.addEventListener('input', handleInput('dec'));
    els.inputs.hex.addEventListener('input', handleInput('hex'));
    els.inputs.bin.addEventListener('input', handleInput('bin'));

    // --- 5. Interaktive Bitgewichte (Klick/Space/Enter) ---
    els.bits.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentState = btn.dataset.state;
            const newState = currentState === "1" ? "0" : "1";
            btn.dataset.state = newState;
            
            // Berechne neuen Dezimalwert aus allen Buttons
            const binStr = els.bits.map(b => b.dataset.state).join('');
            const newDec = parseInt(binStr, 2);
            updateAllFields('dec', newDec.toString(10));
        });
    });

    // --- 6. Tab-Navigation ---
    const switchTab = (mode) => {
        const isConverter = mode === 'converter';
        els.tabs.converter.classList.toggle('active', isConverter);
        els.tabs.quiz.classList.toggle('active', !isConverter);
        els.tabs.converter.setAttribute('aria-selected', isConverter);
        els.tabs.quiz.setAttribute('aria-selected', !isConverter);
        
        els.views.converter.classList.toggle('hidden', !isConverter);
        els.views.quiz.classList.toggle('hidden', isConverter);

        if (!isConverter && quizState.targetValueDec === null) generateQuiz();
    };

    els.tabs.converter.addEventListener('click', () => switchTab('converter'));
    els.tabs.quiz.addEventListener('click', () => switchTab('quiz'));

    // --- 7. Quiz-Modus ---
    const sysNames = { dec: 'Dezimal', hex: 'Hexadezimal', bin: 'Binär' };

    const generateQuiz = () => {
        // Reset UI
        els.quiz.answer.value = ""; els.quiz.answer.disabled = false;
        els.quiz.answer.classList.remove('invalid'); els.errors.quiz.textContent = "";
        els.quiz.feedback.textContent = ""; els.quiz.btnCheck.disabled = false;
        els.quiz.answer.focus();

        // Parameter
        const diff = els.quiz.difficulty.value;
        const maxVal = diff === 'easy' ? 15 : diff === 'medium' ? 127 : 255;
        const decVal = Math.floor(Math.random() * (maxVal + 1));
        
        // Zufällige Richtung (6 Permutationen)
        const directions = [
            ['dec', 'bin'], ['bin', 'dec'], ['dec', 'hex'], 
            ['hex', 'dec'], ['bin', 'hex'], ['hex', 'bin']
        ];
        const [src, tgt] = directions[Math.floor(Math.random() * directions.length)];

        // State speichern
        quizState.targetValueDec = decVal;
        quizState.targetSys = tgt;
        quizState.targetValueStr = tgt === 'dec' ? decVal.toString(10) : tgt === 'hex' ? decToHex(decVal) : decToBin(decVal);

        const srcValueStr = src === 'dec' ? decVal.toString(10) : src === 'hex' ? decToHex(decVal) : decToBin(decVal);
        els.quiz.question.textContent = `Rechne: ${srcValueStr} (${sysNames[src]}) → ${sysNames[tgt]}`;
    };

    const checkQuiz = () => {
        let ans = els.quiz.answer.value.trim();
        if (ans === "") return;

        let isCorrect = false;
        if (quizState.targetSys === 'dec') isCorrect = parseInt(ans, 10) === quizState.targetValueDec;
        if (quizState.targetSys === 'hex') isCorrect = ans.toUpperCase() === quizState.targetValueStr;
        if (quizState.targetSys === 'bin') isCorrect = parseInt(ans, 2) === quizState.targetValueDec;

        els.quiz.answer.disabled = true;
        els.quiz.btnCheck.disabled = true;

        if (isCorrect) {
            els.quiz.feedback.textContent = "Richtig!";
            els.quiz.feedback.className = "feedback-success";
        } else {
            els.quiz.feedback.textContent = `Falsch. Lösung: ${quizState.targetValueStr}`;
            els.quiz.feedback.className = "feedback-error";
        }
    };

    // Quiz Events
    els.quiz.difficulty.addEventListener('change', generateQuiz);
    els.quiz.btnNext.addEventListener('click', generateQuiz);
    els.quiz.btnCheck.addEventListener('click', checkQuiz);
    els.quiz.answer.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkQuiz(); });
    els.quiz.answer.addEventListener('input', (e) => {
        // Strip invalid chars on the fly analog zum Konverter
        let val = e.target.value;
        const t = quizState.targetSys;
        if (t === 'dec' && !isValidDec(val)) val = val.replace(/[^\d]/g, '');
        if (t === 'hex' && !isValidHex(val)) val = val.replace(/[^0-9A-Fa-f]/g, '');
        if (t === 'bin' && !isValidBin(val)) val = val.replace(/[^01]/g, '');
        e.target.value = val;
    });

    // --- 8. Referenz (Cheat Sheet) Init ---
    const buildReferenceTable = () => {
        let html = '';
        for (let i = 0; i <= 15; i++) {
            html += `<tr><td>${i}</td><td>${i.toString(16).toUpperCase()}</td><td>${i.toString(2).padStart(4, '0')}</td></tr>`;
        }
        els.refTableBody.innerHTML = html;
    };

    // Bootstrap
    updateBitsUI();
    buildReferenceTable();

})();