
/*
==================================================
 GEME PROJECT - 3D VIEWPORT
 Sistema de renderização tridimensional
==================================================
*/

class GEMEViewport {

    constructor(container) {

        this.container = container;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.grid = null;
        this.objects = [];

        this.initialized = false;

    }

    init() {

        if (this.initialized) return;

        if (!this.container) {
            console.error("Viewport: container não encontrado.");
            return;
        }

        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLighting();
        this.createGrid();
        this.createEvents();

        this.animate();

        this.initialized = true;

        console.log("GEME Viewport iniciado.");

    }

    createScene() {

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0x101722);

    }

    createCamera() {

        const width = this.container.clientWidth || 800;
        const height = this.container.clientHeight || 500;

        this.camera = new THREE.PerspectiveCamera(
            60,
            width / height,
            0.1,
            1000
        );

        this.camera.position.set(8, 6, 8);

        this.camera.lookAt(0, 0, 0);

    }

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 2)
        );

        this.renderer.setSize(
            this.container.clientWidth || 800,
            this.container.clientHeight || 500
        );

        this.renderer.shadowMap.enabled = true;

        this.container.appendChild(
            this.renderer.domElement
        );

    }

    createLighting() {

        const ambient = new THREE.AmbientLight(
            0xffffff,
            1.2
        );

        this.scene.add(ambient);

        const directional = new THREE.DirectionalLight(
            0xffffff,
            2
        );

        directional.position.set(5, 10, 5);

        directional.castShadow = true;

        this.scene.add(directional);

    }

    createGrid() {

        this.grid = new THREE.GridHelper(
            100,
            100,
            0x4287f5,
            0x263445
        );

        this.scene.add(this.grid);

    }

    addCube() {

        const geometry = new THREE.BoxGeometry(
            1,
            1,
            1
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            roughness: 0.5,
            metalness: 0.1
        });

        const cube = new THREE.Mesh(
            geometry,
            material
        );

        cube.position.y = 0.5;

        cube.castShadow = true;
        cube.receiveShadow = true;

        this.scene.add(cube);

        this.objects.push(cube);

        return cube;

    }

    addSphere() {

        const geometry = new THREE.SphereGeometry(
            0.5,
            32,
            32
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x22c55e,
            roughness: 0.4
        });

        const sphere = new THREE.Mesh(
            geometry,
            material
        );

        sphere.position.y = 0.5;

        this.scene.add(sphere);

        this.objects.push(sphere);

        return sphere;

    }

    addPlane() {

        const geometry = new THREE.PlaneGeometry(
            5,
            5
        );

        const material = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(
            geometry,
            material
        );

        plane.rotation.x = -Math.PI / 2;

        this.scene.add(plane);

        this.objects.push(plane);

        return plane;

    }

    createEvents() {

        window.addEventListener("resize", () => {

            this.resize();

        });

    }

    resize() {

        if (!this.camera || !this.renderer) {
            return;
        }

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        if (!width || !height) {
            return;
        }

        this.camera.aspect = width / height;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);

    }

    animate() {

        requestAnimationFrame(() => this.animate());

        if (!this.renderer || !this.scene || !this.camera) {
            return;
        }

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

    clear() {

        this.objects.forEach(object => {

            this.scene.remove(object);

            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {

                if (Array.isArray(object.material)) {

                    object.material.forEach(material => {
                        material.dispose();
                    });

                } else {

                    object.material.dispose();

                }

            }

        });

        this.objects = [];

    }

}

window.GEME_VIEWPORT = GEMEViewport;
