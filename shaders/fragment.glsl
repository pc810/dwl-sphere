uniform float time;
uniform vec4 resolution;

varying vec2 vUv;
varying vec3 vPosition;
float pi = 3.141592653589793238;

void main(){      
  vec2 newUv = (vUv - vec2(0.5))*resolution.zw  + vec2(0.5);      
  float g = sin(121.*newUv.y + time)-0.5;
  float c = smoothstep(.01, .09, g);
  gl_FragColor = vec4(c,c,c, 1.0);  
}