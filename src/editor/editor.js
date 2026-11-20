
/*
==================================================
 GEME PROJECT - GEME 3D STUDIO
 Sistema principal do editor 3D
==================================================
*/

class GEMEEditor {

    constructor() {

        this.objects = [];
        this.selectedObject = null;

        this.settings = {
            grid: true,
            shadows: true,
            camera: "perspective"
        };

        this.initialized = false;

    }

    init() {

        if (this.initialized) {
            return;
        }

        console.log("GEME 3D STUDIO iniciado.");

        this.createWorkspace();
        this.initialized = true;

    }

    createWorkspace() {

        console.log("Workspace preparado.");

    }

    addObject(object) {

        this.objects.push(object);

        console.log("Objeto adicionado:", object);

        return object;

    }

    removeObject(object) {

        this.objects = this.objects.filter(
            item => item !== object
        );

        if (this.selectedObject === object) {
            this.selectedObject = null;
        }

    }

    selectObject(object) {

        this.selectedObject = object;

        console.log("Objeto selecionado:", object);

    }

    clearScene() {

        this.objects = [];
        this.selectedObject = null;

        console.log("Cena limpa.");

    }

    getObjects() {

        return this.objects;

    }

    getSelectedObject() {

        return this.selectedObject;

    }

}

// Instância global do editor
window.GEME_EDITOR = new GEMEEditor();
