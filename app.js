import Sketch from './module';
let sketch = new Sketch({
    dom: document.getElementById("container"),

});

function raf(){        
    window.requestAnimationFrame(raf)
}
raf();
