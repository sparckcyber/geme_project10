
/*
========================================
 GEME PROJECT
 Sistema principal
========================================
*/

const GEME = {
    name: "GEME PROJECT",
    version: "0.1.0",
    initialized: false,

    init() {
        if (this.initialized) return;

        console.log("================================");
        console.log("GEME PROJECT");
        console.log("Sistema iniciado!");
        console.log("Versão:", this.version);
        console.log("================================");

        this.initialized = true;
        this.setup();
    },

    setup() {
        this.setupEnvironment();
        this.setupEvents();
    },

    setupEnvironment() {
        console.log("Ambiente preparado.");
    },

    setupEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            console.log("Interface carregada.");
        });
    }
};

// Inicialização
GEME.init();
