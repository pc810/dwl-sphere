import * as THREE from "three";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import gridfragment from "./shaders/gridfragment.glsl";
import gridvertex from "./shaders/gridvertex.glsl";
//import * as dat from "dat.gui";
//let OrbitalControls = require("three-orbit-controls")(THREE);

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();
    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);    
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 1.5);
    //this.controls = new OrbitalControls(this.camera, this.renderer.domElement);
    this.time = 0;
    this.count = 25;
    this.theme = 0; 
    this.isPlaying = true;    
    this.addObjects();
    this.addGrid();
    this.resize();
    this.render();
    this.setupResize();
    // this.setupChangeTheme();
  }
  settings() {
    let that = this;
    this.settings = {
      progress: 0,
    };
    //this.gui = new dat.GUI();
    //this.gui.add(this.settings, "progress", 0, 1, 0.01);
  }
  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }
  // setupChangeTheme(){
  //   var that = this;
  //   document.getElementById('clickme').addEventListener('click',()=>{
  //     that.theme = that.theme===1?1:0;
  //   });
  //   console.log('easy peazy lemon squezy');
  // }
  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.imageAspect = 800 / 553;
    let a1;
    let a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (this.height / this.width) * this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;
    this.camera.updateProjectionMatrix();
  }
  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        resolution: { type: "v4", value: new THREE.Vector4() },     
      },
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.geometry = new THREE.SphereBufferGeometry(0.5, 100, 100);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = 40 * (Math.PI / 180);
    this.scene.add(this.mesh);
  }
  addGrid() {
    this.materialGrid = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },        
      },
      transparent: true,
      // wireframe: true,
      vertexShader: gridvertex,
      fragmentShader: gridfragment,
    });
    this.geometryGrid = new THREE.PlaneBufferGeometry(20,20,20,20);    
    this.grid = new THREE.Mesh(this.geometryGrid, this.materialGrid);
    let scale = 1;
    this.grid.position.z = -2;
    this.scene.add(this.grid);
  }
  stop() {
    this.isPlaying = false;
  }
  play() {
    if (!this.isPlaying) {
      this.render();
      this.isPlaying = true;
    }
  }
  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    if (this.materials) {
      this.materials.forEach((m) => {
        m.uniforms.time.value = this.time;
      });
    }
    this.material.uniforms.time.value = this.time;
    this.materialGrid.uniforms.time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
