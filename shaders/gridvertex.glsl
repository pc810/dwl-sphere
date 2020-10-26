uniform float time;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.141592653589793238;

void main(){  
  vUv = uv;
  vec3 pos = position; 
  pos.z = 0.1*sin(.5*pos.y + time / 4.); 
  vec4 mvposition =  modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 800. * (1. / -mvposition.z);
 	gl_Position = projectionMatrix * mvposition;
 	// gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
