uniform float time;
//imporant varying
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
void main(){  
  vUv = uv;
  vec3 pos = position;  
 	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
