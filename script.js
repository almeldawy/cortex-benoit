document.addEventListener('DOMContentLoaded', () => {
    // --- Éléments du DOM ---
    const bootSequence = document.getElementById('boot-sequence');
    const bootTextElement = document.getElementById('boot-text');
    const progressBar = document.getElementById('progressBar');
    const bootStaticAudio = document.getElementById('boot-static-audio');
    const bootBeepAudio = document.getElementById('boot-beep-audio');

    const mainInterface = document.getElementById('main-interface');
    const brainModules = document.querySelectorAll('.brain-module');
    const zoneDetailsPanel = document.getElementById('zone-details-panel');
    const detailPanelTitle = document.getElementById('detail-panel-title');
    const detailPanelContent = document.getElementById('detail-panel-content');
    const closeDetailsButton = document.getElementById('close-details-button');
    const neuronalStatus = document.getElementById('neuronalStatus');
    const uptimeElement = document.getElementById('uptime');
    const dataStreamElement = document.getElementById('dataStream');

    // --- Audio de fond pour l'ambiance (nécessite une interaction utilisateur pour démarrer) ---
    const backgroundAudio = new Audio('robot-talk-3-344759.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.2;

    // --- Séquence de Démarrage (Boot Sequence) ---
    const bootMessages = [
        "BOOTING_CORTEX_BENOIT...",
        "INITIALIZING_NEURAL_NETWORKS...",
        "SCANNING_FOR_RESIDUAL_THOUGHTS... [CLEAN]",
        "LOADING_PERSONALITY_MODULES...",
        "ERROR: COFFEE_SUPPLY_LOW. INITIATING_MINIMAL_MODE.",
        "ADJUSTING_HUMOR_PARAMETERS... [OPTIMAL]",
        "ESTABLISHING_WEB_PRESENCE_PROTOCOL...",
        "WARNING: MEMORY_FRAGMENTATION_DETECTED. PROCEED_WITH_CAUTION.",
        "CORTEX_BENOIT_V.3.1.4_ONLINE."
    ];
    let bootMessageIndex = 0;
    let charIndex = 0;
    let bootProgress = 0;

    const typeBootText = () => {
        if (bootMessageIndex < bootMessages.length) {
            const currentMessage = bootMessages[bootMessageIndex];
            if (charIndex < currentMessage.length) {
                bootTextElement.textContent += currentMessage.charAt(charIndex);
                charIndex++;
                if (bootBeepAudio) bootBeepAudio.play().catch(e => console.log("Beep audio error:", e));
                setTimeout(typeBootText, 50); // Vitesse de frappe
            } else {
                bootTextElement.textContent += '\n'; // Nouvelle ligne
                bootMessageIndex++;
                charIndex = 0;
                bootProgress += (100 / bootMessages.length);
                progressBar.style.width = `${bootProgress}%`;

                if (bootProgress >= 80 && bootStaticAudio) { // Bruit statique vers la fin du boot
                    bootStaticAudio.play().catch(e => console.log("Static audio error:", e));
                    bootStaticAudio.volume = 0.5;
                }

                if (bootMessageIndex < bootMessages.length) {
                    setTimeout(typeBootText, 500); // Pause entre les lignes
                } else {
                    // Fin de la séquence de boot
                    setTimeout(() => {
                        if (bootStaticAudio) bootStaticAudio.pause();
                        bootSequence.classList.remove('active');
                        bootSequence.classList.add('hidden');
                        bootSequence.addEventListener('transitionend', () => {
                            bootSequence.style.display = 'none';
                            mainInterface.classList.remove('hidden');
                            // Démarrer la musique de fond après la séquence de boot
                            if (backgroundAudio.paused) {
                                backgroundAudio.play().catch(e => console.error("Erreur lecture audio:", e));
                            }
                        }, { once: true });
                    }, 1000); // Dernière pause avant de cacher
                }
            }
        }
    };

    // Démarrer la séquence de boot quand le DOM est prêt
    typeBootText();

    // --- Données pour les panneaux de zone ---
    const zoneDetailsData = {
        frontal: {
            title: 'LOBE FRONTAL - USINE À IDÉES FARFELUES',
            content: `
                <p>Bienvenue dans le générateur d'absurdités de Benoît. Les concepts les plus... <i>uniques</i>... prennent vie ici, souvent au détriment de la logique ou du bon sens. Prêt à lancer le générateur ?</p>
                <button id="generateIdea" class="retro-button">GÉNÉRER IDÉE DÉGÉNÉRÉE</button>
                <div id="ideaOutput" class="idea-output"></div>
            `,
            activate: (panelElement) => {
                const generateButton = panelElement.querySelector('#generateIdea');
                const ideaOutput = panelElement.querySelector('#ideaOutput');
                const ideas = [
                    "UN E-COMMERCE DE CHIENS-BALLONS INFLUENÇABLES PAR LA LUNE.",
                    "UNE APPLICATION POUR ÉVALUER LA PERSONNALITÉ DES SEMELLES DE CHAUSSURES.",
                    "UN RÉSEAU SOCIAL EXCLUSIVEMENT POUR LES CHAUVES-SOURIS PHILOSOPHES.",
                    "UN SYSTÈME DE GESTION DE PROJET POUR LES PROJETS QUI N'EXISTENT PAS.",
                    "UNE IA CAPABLE DE TRADUIRE LES PENSÉES DES PLANTES EN PUNCHLINES DE CODE."
                ];

                if (generateButton) {
                    generateButton.onclick = () => {
                        gsap.to(ideaOutput, { duration: 0.1, opacity: 0, onComplete: () => {
                            ideaOutput.textContent = 'GÉNÉRATION EN COURS... [GLITCH.PROCESS]';
                            gsap.to(ideaOutput, { duration: 0.5, opacity: 1 });
                            gsap.to(generateButton, { duration: 0.2, scale: 0.9, yoyo: true, repeat: 1 });
                            generateButton.disabled = true;

                            setTimeout(() => {
                                const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
                                ideaOutput.textContent = randomIdea;
                                ideaOutput.style.color = 'var(--color-accent-glitch)';
                                gsap.fromTo(ideaOutput, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
                                generateButton.disabled = false;
                            }, 1800); // Simule le temps de génération
                        }});
                    };
                }
            }
        },
        visual: {
            title: 'CORTEX VISUEL - ATELIER DE DESIGN CSS',
            content: `
                <p>Ici, les pixels sont déformés et les couleurs saturées pour des interfaces mémorables. Activez les réglages pour observer l'impact sur le système !</p>
                <div class="color-picker">
                    <button class="color-btn" data-color="#FF00FF" style="background-color: #FF00FF;"></button>
                    <button class="color-btn" data-color="#00FFFF" style="background-color: #00FFFF;"></button>
                    <button class="color-btn" data-color="#FF8C00" style="background-color: #FF8C00;"></button>
                    <button class="color-btn" data-color="#33FF33" style="background-color: #33FF33;"></button>
                </div>
                <p class="color-status">COULEUR PRIMAIRE ACTUELLE: <span id="currentPrimaryColor" style="color: var(--color-primary-neon);">CYAN</span></p>
                <button id="applyGlitch" class="retro-button">APPLIQUER DISTORSION VISUELLE</button>
            `,
            activate: (panelElement) => {
                const colorButtons = panelElement.querySelectorAll('.color-btn');
                const currentPrimaryColor = panelElement.querySelector('#currentPrimaryColor');
                const applyGlitchButton = panelElement.querySelector('#applyGlitch');

                colorButtons.forEach(button => {
                    button.onclick = () => {
                        const newColor = button.dataset.color;
                        document.documentElement.style.setProperty('--color-primary-neon', newColor);
                        currentPrimaryColor.textContent = newColor.replace('#', 'HEX ').toUpperCase();
                        currentPrimaryColor.style.color = newColor;
                        gsap.to('body, .main-interface, .boot-text, .brain-module, .side-panel, .zone-details-panel', {
                            filter: `hue-rotate(${Math.random() * 360}deg) saturate(1.5)`,
                            duration: 0.5, ease: "power1.out",
                            onComplete: () => gsap.to('body, .main-interface, .boot-text, .brain-module, .side-panel, .zone-details-panel', { filter: 'none', duration: 0.5 })
                        });
                    };
                });

                if (applyGlitchButton) {
                    applyGlitchButton.onclick = () => {
                        // Glitch visuel sur l'interface principale
                        gsap.timeline()
                            .set(mainInterface, { filter: 'brightness(1.5) saturate(2)' })
                            .to(mainInterface, {
                                duration: 0.05,
                                x: "+=5", // Glitch horizontal
                                y: "+=5", // Glitch vertical
                                repeat: 3,
                                yoyo: true,
                                ease: "steps(1)"
                            })
                            .to(mainInterface, {
                                duration: 0.5,
                                x: 0, y: 0,
                                filter: 'brightness(1) saturate(1)'
                            });

                        // Glitch sonore (tu devras fournir un fichier 'glitch.mp3')
                        const glitchAudio = new Audio('glitch.mp3'); // Ceci devrait être 'short_glitch.mp3' selon l'autre partie du script
                        glitchAudio.volume = 0.5;
                        glitchAudio.play().catch(e => console.log("Glitch audio error:", e));
                    };
                }
            }
        },
        limbic: {
            title: 'SYSTÈME LIMBIQUE - GÉNÉRATEUR DE BUGS ÉMOTIONNELS',
            content: `
                <p>Attention : Cette zone génère des bugs basés sur l'état émotionnel de Benoît. Un manque de sommeil peut causer une faille SQL critique !</p>
                <p class="bug-message">BUG_REPORT: [ERROR: 0xDEADBEEF] NEURONAL_OVERFLOW IN FUNCTION 'GET_MOTIVATION()'.</p>
                <div id="bugGameZone" class="bug-zone">
                    <p class="bug-instruction">CLIQUEZ SUR LES PAQUETS DE DONNÉES CORROMPUES !</p>
                </div>
                <p id="bugsSquashed" style="text-align: center; margin-top: 10px;">BUGS ÉCRASÉS: 0</p>
            `,
            activate: (panelElement) => {
                const bugGameZone = panelElement.querySelector('#bugGameZone');
                const bugsSquashedElement = panelElement.querySelector('#bugsSquashed');
                let bugsSquashed = 0;

                const spawnBug = () => {
                    if (!bugGameZone) return; // S'assurer que la zone existe avant de créer des bugs

                    const bugPacket = document.createElement('div');
                    bugPacket.classList.add('bug-packet');
                    bugPacket.style.left = `${Math.random() * (bugGameZone.offsetWidth - 25)}px`;
                    bugPacket.style.top = `${Math.random() * (bugGameZone.offsetHeight - 25)}px`;
                    bugPacket.style.animationDuration = `${3 + Math.random() * 2}s`; // Durée aléatoire

                    bugGameZone.appendChild(bugPacket);

                    gsap.fromTo(bugPacket,
                        { opacity: 0, scale: 0.5 },
                        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
                    );

                    bugPacket.onclick = () => {
                        bugsSquashed++;
                        bugsSquashedElement.textContent = `BUGS ÉCRASÉS: ${bugsSquashed}`;
                        gsap.to(bugPacket, {
                            scale: 0, opacity: 0, duration: 0.2, onComplete: () => {
                                bugPacket.remove();
                                const bugSound = new Audio('sounds/bug_squash.mp3'); // Assurez-vous que ce chemin est correct
                                bugSound.volume = 0.5;
                                bugSound.play().catch(e => console.log("Bug sound error:", e));
                            }
                        });
                    };

                    setTimeout(() => {
                        if (bugPacket.parentNode) { // Si le bug n'a pas été cliqué
                            gsap.to(bugPacket, { opacity: 0, duration: 0.5, onComplete: () => bugPacket.remove() });
                        }
                    }, 4000); // Disparaît après 4 secondes s'il n'est pas cliqué
                };

                // Lancer la génération de bugs toutes les 1.5 secondes
                // Utiliser un intervalle qui peut être nettoyé si le panneau est fermé
                const bugInterval = setInterval(spawnBug, 1500);

                // Nettoyer l'intervalle lorsque le panneau est fermé
                zoneDetailsPanel.dataset.intervalId = bugInterval; // Stocker l'ID pour le nettoyer
            }
        },
        cerebellum: {
            title: "CERVELET - LOGIC.JS (OPTIMISATION LOGICIELLE)",
            content: `
                <p>Le module <b>LOGIC.JS</b> gère l'optimisation des algorithmes. Il exécute des simulations de routine pour améliorer l'efficacité globale du Cortex Benoît.</p>
                <p>SIMULATION DE ROUTINE EN COURS...</p>
                <div id="logicSimulation" class="data-stream" style="height: 120px;"></div>
                <button id="runOptimizationBtn" class="retro-button">LANCER OPTIMISATION</button>
            `,
            activate: (panelElement) => { // CHANGEMENT ICI : 'script' devient 'activate'
                const logicSimulation = panelElement.querySelector('#logicSimulation'); // CHANGEMENT ICI
                const runOptimizationBtn = panelElement.querySelector('#runOptimizationBtn'); // CHANGEMENT ICI
                let simulationInterval;

                function startSimulation() {
                    let simCounter = 0;
                    simulationInterval = setInterval(() => {
                        simCounter++;
                        const messages = [
                            `[LOGIC.JS]: Processing data block ${simCounter}...`,
                            `[LOGIC.JS]: Analyzing algorithm efficiency...`,
                            `[LOGIC.JS]: Rerouting neural pathways...`,
                            `[LOGIC.JS]: Compiling optimization patch ${simCounter % 10}...`
                        ];
                        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                        logicSimulation.textContent += `${randomMessage}\n`;
                        logicSimulation.scrollTop = logicSimulation.scrollHeight;
                        if (simCounter > 20) { // Stop after some messages
                            clearInterval(simulationInterval);
                            logicSimulation.textContent += "\n[LOGIC.JS]: OPTIMISATION COMPLÈTE. Efficacité +3.14%.\n";
                            runOptimizationBtn.style.display = 'block'; // Show button again
                            neuronalStatus.textContent = "STABLE";
                            neuronalStatus.className = "status-ok";
                        }
                    }, 300);
                }

                if (runOptimizationBtn) { // Ajout d'une vérification
                    runOptimizationBtn.onclick = () => {
                        logicSimulation.textContent = ""; // Clear previous log
                        runOptimizationBtn.style.display = 'none'; // Hide button during simulation
                        neuronalStatus.textContent = "OPTIMISATION_ACTIVE...";
                        neuronalStatus.className = "status-warning";
                        startSimulation();
                    };
                }

                // Cleanup on close - important pour les intervalles
                const closeHandler = () => {
                    clearInterval(simulationInterval);
                    closeDetailsButton.removeEventListener('click', closeHandler); // Supprime l'écouteur après nettoyage
                };
                closeDetailsButton.addEventListener('click', closeHandler, { once: true });
                zoneDetailsPanel.dataset.intervalId = simulationInterval; // Stocker l'ID pour le nettoyage global
            }
        },
        brainstem: {
            title: 'TRONC CÉRÉBRAL - RÉACTEUR À CAFÉINE',
            content: `
                <p>Le carburant vital du système Benoît. Maintenez le niveau de caféine pour des performances optimales. Une carence peut entraîner des incohérences syntaxiques !</p>
                <div class="coffee-gauge-container">
                    <div class="coffee-gauge-fill" id="coffeeGaugeFill"></div>
                </div>
                <p style="text-align: center; margin-top: 10px;">NIVEAU CAFÉINE: <span id="fuelLevelDisplay" class="fuel-level-display">75%</span></p>
                <button id="injectCoffee" class="retro-button">INJECTER CAFÉINE (+15%)</button>
            `,
            activate: (panelElement) => {
                const injectCoffeeButton = panelElement.querySelector('#injectCoffee');
                const fuelLevelDisplay = panelElement.querySelector('#fuelLevelDisplay');
                const coffeeGaugeFill = panelElement.querySelector('#coffeeGaugeFill');

                // Initialiser la jauge CSS
                let currentFuel = parseInt(fuelLevelDisplay.textContent);
                coffeeGaugeFill.style.setProperty('--coffee-level', `${currentFuel}%`);

                if (injectCoffeeButton) {
                    injectCoffeeButton.onclick = () => {
                        currentFuel = Math.min(100, currentFuel + 15);
                        fuelLevelDisplay.textContent = `${currentFuel}%`;
                        coffeeGaugeFill.style.setProperty('--coffee-level', `${currentFuel}%`); // Mise à jour de la variable CSS

                        // Mettre à jour le statut neuronal global et l'animation du cerveau
                        if (currentFuel >= 90) {
                            neuronalStatus.textContent = 'SURCHARGE CAFÉINE !';
                            neuronalStatus.className = 'status-critical';
                            gsap.to('.brain-display', { filter: 'brightness(1.5) hue-rotate(30deg)', duration: 0.5, yoyo: true, repeat: 1 });
                        } else if (currentFuel >= 50) {
                            neuronalStatus.textContent = 'OPTIMAL';
                            neuronalStatus.className = 'status-ok';
                        } else {
                            neuronalStatus.textContent = 'FAIBLE NIVEAU CAFÉINE';
                            neuronalStatus.className = 'status-warning';
                        }
                    };
                }
            }
        }
    };

    // --- Gestion des clics sur les modules du cerveau ---
    brainModules.forEach(module => {
        module.addEventListener('click', () => {
            const zoneId = module.dataset.zone;
            const data = zoneDetailsData[zoneId];

            if (data) {
                detailPanelTitle.textContent = data.title;
                detailPanelContent.innerHTML = data.content;

                // Nettoyer tout intervalle précédent si un jeu était actif
                if (zoneDetailsPanel.dataset.intervalId) {
                    clearInterval(zoneDetailsPanel.dataset.intervalId);
                    delete zoneDetailsPanel.dataset.intervalId;
                }

                zoneDetailsPanel.classList.remove('hidden');

                // AJOUTEZ CES LIGNES POUR RENDRE LE PANNEAU VISIBLE ET À TAILLE NORMALE INSTANTANÉMENT
                zoneDetailsPanel.style.opacity = '1';
                zoneDetailsPanel.style.transform = 'translate(-50%, -50%) scale(1)';
                zoneDetailsPanel.style.pointerEvents = 'auto'; // Pour qu'il soit interactif si besoin

                // L'appel GSAP reste commenté :
                // gsap.fromTo(zoneDetailsPanel,
                //     { opacity: 0, scale: 0.8, y: "-50%" },
                //     { opacity: 1, scale: 1, y: "-50%", duration: 0.4, ease: "back.out(1.7)" }
                // );

                // Activer les fonctionnalités spécifiques à la zone
                if (data.activate) {
                    data.activate(detailPanelContent);
                }
            }
        });
    });

    // --- Fermer le panneau de détails ---
    closeDetailsButton.addEventListener('click', () => {
        gsap.to(zoneDetailsPanel, {
            opacity: 0, scale: 0.8, y: "-50%", duration: 0.3, ease: "power2.in",
            onComplete: () => {
                zoneDetailsPanel.classList.add('hidden');
                // Nettoyer l'intervalle si le panneau contenait un jeu
                if (zoneDetailsPanel.dataset.intervalId) {
                    clearInterval(zoneDetailsPanel.dataset.intervalId);
                    delete zoneDetailsPanel.dataset.intervalId;
                }
            }
        });
    });

    // --- Mise à jour de l'uptime et du flux de données ---
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        uptimeElement.textContent = `${h}:${m}:${s}`;

        // Ajouter une ligne au flux de données
        const dataPrefixes = ["LOG:", "EVENT:", "WARNING:", "DEBUG:"];
        const randomData = Math.random().toString(16).substring(2, 8).toUpperCase();
        const dataEntry = `${dataPrefixes[Math.floor(Math.random() * dataPrefixes.length)]} PROCESSING_UNIT_ACTIVITY_${randomData}\n`;
        dataStreamElement.textContent += dataEntry;
        dataStreamElement.scrollTop = dataStreamElement.scrollHeight; // Scroll auto

        // Glitch aléatoire de l'interface
        // La condition window.innerWidth > 768 est désormais dans le CSS pour les animations du brain-display
        // Si vous voulez que ce glitch spécifique ne se produise que sur les grands écrans, vous devez l'ajouter ici.
        // Pour l'instant, il se produit sur toutes les tailles d'écran.
        if (Math.random() < 0.05) { // 5% de chance de glitch
            gsap.timeline()
                .set(mainInterface, { filter: 'brightness(1.5) saturate(2)' })
                .to(mainInterface, {
                    duration: 0.05,
                    x: "+=5",
                    y: "+=5",
                    repeat: 3,
                    yoyo: true,
                    ease: "steps(1)"
                })
                .to(mainInterface, {
                    duration: 0.5,
                    x: 0, y: 0,
                    filter: 'brightness(1) saturate(1)'
                });
            const glitchAudio = new Audio('short_glitch.mp3');
            glitchAudio.volume = 0.3;
            glitchAudio.play().catch(e => console.log("Short glitch audio error:", e));
        }

    }, 1000); // Chaque seconde

    // Ajoute un écouteur de clic sur le document pour démarrer l'audio de fond
    // (nécessaire pour la plupart des navigateurs modernes)
    document.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().catch(e => console.error("Erreur de lecture audio :", e));
        }
    }, { once: true }); // Ne déclenche qu'une seule fois
});
