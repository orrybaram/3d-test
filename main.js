// Scene
var WIDTH = window.innerWidth
, HEIGHT = window.innerHeight

// Camera
, VIEW_ANGLE = 45
, ASPECT = WIDTH / HEIGHT
, NEAR = 1
, FAR = 1000

, $container = $('#container')

// Create renderer camera and scene
, renderer = new THREE.WebGLRenderer()
, camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
, scene = new THREE.Scene();

scene.add(camera);
camera.position.x = 7;
camera.position.y = 3;
camera.position.z = 0;
camera.rotation.y = -.6

renderer.setSize(WIDTH, HEIGHT);

$container.append(renderer.domElement);


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;

var thing;

loader.load('what.dae', function (result) {
  
  thing = result.scene;
  scene.add(thing);

  setMaterial(thing, new THREE.MeshLambertMaterial({color: 0x3557A0}));

  animloop();
});

var setMaterial = function(node, material) {
  node.material = material;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      setMaterial(node.children[i], material);
    }
  }
}



// create a point light
light = new THREE.DirectionalLight( 0xFFFFFF );
light.position.set( 0, 500, -1700 );
light.target.position.set(100,-10,-100)
light.intensity = 2;
//scene.add( new THREE.DirectionalLightHelper(light, 2.5) );
light.castShadow = true;
scene.add(light)

// draw!
function animloop(){
	// thing.rotation.y += .01
  	renderer.render(scene, camera)

    requestAnimFrame(animloop);

};
