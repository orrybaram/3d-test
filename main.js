// Scene
var WIDTH = window.innerWidth
, HEIGHT = window.innerHeight

// Camera
, VIEW_ANGLE = 45
, ASPECT = WIDTH / HEIGHT
, NEAR = 1
, FAR = 1000

, $screen = $('#screen')

// Create renderer camera and scene
, renderer = new THREE.WebGLRenderer()
, camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
, scene = new THREE.Scene()

// Player
, speed = 0.001
, max_speed = .4

, keys = [];

$(function () {
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);

    // disable vertical scrolling from arrows :)
    document.onkeydown = function(){ return event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 37 && event.keyCode != 39}
});

camera.position.set(600, 5, -135);
camera.rotation.set(.06, 2, 0);
camera.eulerOrder = "YZX";

scene.add(camera);


renderer.setSize(WIDTH, HEIGHT);

$screen.append(renderer.domElement);


var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;

var deathStar;

loader.load('death-star2.dae', function (result) {
  
  deathStar = result.scene;
  scene.add(deathStar);

  setMaterial(deathStar, new THREE.MeshLambertMaterial({ color: 0xCCCCCC }));

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

light.intensity = 1;
//scene.add( new THREE.DirectionalLightHelper(light, 2.5) );
light.castShadow = true;
scene.add(light)


light2 = light = new THREE.DirectionalLight( 0xFFFFFF );
light2.position.set( 150, 30, 600 );
light2.target.position.set(0,0,0)
light2.intensity = 1;
scene.add(light2)
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
        if (speed >= -max_speed) {
            console.log(speed + "::::" + max_speed)
            speed -= .01;
        }
    }
    if (keys[83]) {  // s -- move backwards
        if (speed <= max_speed / 2) {
            speed += .01;
        }
    }
    if (keys[65]) { //a -- strafe left
        camera.translateX( -.1 )
    }
    if (keys[68]) { //d -- strafe right
        camera.translateX( .1 )
    }
    // if (keys[37]) { // left -- look left
    //     camera.rotation.y += .02;
    // }
    // if (keys[39]) { // right -- look right
    //     camera.rotation.y -= .02;
    // }
    if (keys[38]) { // up -- look down
        camera.rotation.x -= .02;
    }
    if (keys[40]) { // down -- look up
        camera.rotation.x += .02;
    }

    if (keys[37]) { // left -- barrel left
        camera.rotation.z += .02;
    }
    if (keys[39]) { // right -- barrel right
        camera.rotation.z -= .02;
    }
}

function thrusters(velocity) {
    camera.translateZ(velocity)
}

// draw!
function animloop(){
	deathStar.rotation.y += .00005
  	
    handleInteractions();
    thrusters(speed);
    $('#speed').text( (speed * 1000).toFixed(0) * -1 );

    renderer.render(scene, camera)

    requestAnimFrame(animloop);

};
