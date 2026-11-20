
/*
==================================================
 GEME PROJECT
 Interface do GEME 3D STUDIO
==================================================
*/

class GEMEEditorUI {

    constructor() {

        this.viewport = null;
        this.container = null;

    }

    init() {

        this.container = document.getElementById("geme-editor");

        if (!this.container) {
            console.warn("Editor UI: elemento não encontrado.");
            return;
        }

        this.createInterface();
        this.initializeViewport();
        this.bindEvents();

    }

    createInterface() {

        this.container.innerHTML = `
            <div class="geme-studio">

                <div class="studio-header">

                    <div class="studio-brand">
                        <span class="studio-logo">G</span>
                        <div>
                            <strong>GEME 3D STUDIO</strong>
                            <small>Scene Editor</small>
                        </div>
                    </div>

                    <div class="studio-actions">
                        <button id="geme-add-cube">+ Cubo</button>
                        <button id="geme-add-sphere">+ Esfera</button>
                        <button id="geme-clear">Limpar</button>
                    </div>

                </div>

                <div class="studio-workspace">

                    <aside class="studio-sidebar">

                        <h3>FERRAMENTAS</h3>

                        <button class="tool-button" data-tool="select">
                            ↖ Selecionar
                        </button>

                        <button class="tool-button" data-tool="move">
                            ✥ Mover
                        </button>

                        <button class="tool-button" data-tool="rotate">
                            ⟳ Rotacionar
                        </button>

                        <button class="tool-button" data-tool="scale">
                            ⤢ Escalar
                        </button>

                        <div class="sidebar-divider"></div>

                        <h3>OBJETOS</h3>

                        <div id="geme-object-list">
                            <p class="empty-list">
                                Nenhum objeto criado.
                            </p>
                        </div>

                    </aside>

                    <div class="studio-viewport">

                        <div class="viewport-label">
                            VIEWPORT 3D
                        </div>

                        <div id="geme-viewport"></div>

                    </div>

                </div>

                <div class="studio-footer">
                    <span>GEME ENGINE</span>
                    <span id="geme-object-count">Objetos: 0</span>
                    <span>3D STUDIO</span>
                </div>

            </div>
        `;

    }

    initializeViewport() {

        const viewportContainer = document.getElementById(
            "geme-viewport"
        );

        if (
            typeof THREE === "undefined" ||
            typeof window.GEME_VIEWPORT === "undefined"
        ) {

            viewportContainer.innerHTML = `
                <div class="viewport-error">
                    <h3>Viewport 3D</h3>
                    <p>Bibliotecas 3D ainda não conectadas.</p>
                </div>
            `;

            return;

        }

        this.viewport = new window.GEME_VIEWPORT(
            viewportContainer
        );

        this.viewport.init();

    }

    bindEvents() {

        const cubeButton = document.getElementById(
            "geme-add-cube"
        );

        const sphereButton = document.getElementById(
            "geme-add-sphere"
        );

        const clearButton = document.getElementById(
            "geme-clear"
        );

        cubeButton.addEventListener("click", () => {
            this.addCube();
        });

        sphereButton.addEventListener("click", () => {
            this.addSphere();
        });

        clearButton.addEventListener("click", () => {
            this.clearScene();
        });

    }

    addCube() {

        if (!this.viewport) return;

        const cube = this.viewport.addCube();

        this.updateObjectList();

        console.log("Cubo criado:", cube);

    }

    addSphere() {

        if (!this.viewport) return;

        const sphere = this.viewport.addSphere();

        this.updateObjectList();

        console.log("Esfera criada:", sphere);

    }

    clearScene() {

        if (!this.viewport) return;

        this.viewport.clear();

        this.updateObjectList();

    }

    updateObjectList() {

        const list = document.getElementById(
            "geme-object-list"
        );

        const counter = document.getElementById(
            "geme-object-count"
        );

        if (!list || !counter || !this.viewport) {
            return;
        }

        const objects = this.viewport.objects;

        counter.textContent = `Objetos: ${objects.length}`;

        if (objects.length === 0) {

            list.innerHTML = `
                <p class="empty-list">
                    Nenhum objeto criado.
                </p>
            `;

            return;

        }

        list.innerHTML = objects.map((object, index) => {

            const name = object.geometry.type
                .replace("Geometry", "");

            return `
                <button class="object-item">
                    <span>◈</span>
                    ${name} ${index + 1}
                </button>
            `;

        }).join("");

    }

}

window.GEME_EDITOR_UI = new GEMEEditorUI();
