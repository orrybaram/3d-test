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
, scene = new THREE.Scene()

, keys = [];

$(function () {
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);

    // disable vertical scrolling from arrows :)
    document.onkeydown = function(){ return event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 37 && event.keyCode != 39}
});

scene.add(camera);
camera.position.x = 7;
camera.position.y = 3;
camera.position.z = 0;
camera.rotation.y = -.6
camera.eulerOrder = "YXZ";

renderer.setSize(WIDTH, HEIGHT);

$container.append(renderer.domElement);


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;

var thing;

loader.load('death-star2.dae', function (result) {
  
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

// EVENT HANDLERS
// ======================================================
function handleKeyDown(evt){
    keys[evt.keyCode] = true;
}
function handleKeyUp(evt){
    keys[evt.keyCode] = false;
}

function handleInteractions(){    
    if (keys[87]) {  // w -- move forward
        camera.translateZ( -.6 )
    }
    if (keys[83]) {  // s -- move backwards
        camera.translateZ( .6 )
    }
    if (keys[65]) { //a -- strafe left
        camera.translateX( -.6 )
    }
    if (keys[68]) { //d -- strafe right
        camera.translateX( .6 )
    }
    if (keys[37]) { // left -- look left
        camera.rotation.y += .02;
    }
    if (keys[39]) { // right -- look right
        camera.rotation.y -= .02;
    }
    if (keys[38]) { // up -- look up
        camera.rotation.x += .02;
    }
    if (keys[40]) { // down -- look down
        camera.rotation.x -= .02;
    }
}



// draw!
function animloop(){
	// thing.rotation.y += .01
  	handleInteractions();
    renderer.render(scene, camera)

    requestAnimFrame(animloop);

};
