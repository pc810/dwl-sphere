#ifdef GL_ES
precision mediump float;
#endif
varying vec2 vUv;
varying vec3 vPosition;
float pi = 3.141592653589793238;

void main(){          
  vec2 newUv =vUv;
  vec3 col = vec3(0.);
  newUv *= 20.;  
  vec2 gv = fract(newUv)-.5;
  gl_FragColor = vec4(vUv,0., 1.0);    
  if(gv.x>.49 ||gv.y>.49) 
    gl_FragColor = vec4(0.2549, 0.2549, 0.2549, 1.0);
  else 
    gl_FragColor = vec4(col, 1.0);  
}