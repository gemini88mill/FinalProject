var renderer;
var scene;
var camera;

var userPaddle;
var ball;
var wall;
var border;
var collidableMeshList = [];
var backdrop;

var points = 0;

Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

function setupRenderer() {
    renderer = new THREE.WebGLRenderer();
    //						color     alpha
    renderer.setClearColor( 0x000000, 0.5 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
}

function setupCamera() {
    camera.position.x = 0;
    camera.position.y = -50;
    camera.position.z = 60;
    camera.lookAt( scene.position );
}

function render() {
    //cube.rotation.x += 0.01;
    //scene.remove(wall[13]);

    requestAnimationFrame(render);

    paddleMovement();
    ballMovement();
    checkCollision();
    //console.log(ball.position.x);
    console.log(points);

    renderer.render(scene, camera);
}

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    setupRenderer();
    setupCamera();

    userPaddle = createBox(20,2.5,2, 0x00ffff, new THREE.Vector3(0,-40,0));
    ball = createBall(2);
    wall = createWall();
    border = createLine();
    //backdrop = createBox(200, 200, 1, 0xffffff, new THREE.Vector3(0,100,-5));

    console.log(ball.geometry.vertices);


    document.body.appendChild( renderer.domElement );

    // Call render
    render();
}

function displayScore(){
    return points;
}

window.onload = init();