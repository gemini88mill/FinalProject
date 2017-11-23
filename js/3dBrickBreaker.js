var renderer;
var scene;
var camera;

var userPaddle;
var ball;
var wall;
var border;
var collidableMeshList = [];
var backdrop;

var cube;

var points = 0;

var uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
};

// var attributes = {
//     displacement: {
//         type: 'f', // a float
//         value: [] // an empty array
//     }
// };

var shaderWall = {
    vertexName: "vertexShaderStatic",
    fragmentName: "fragmentShaderStatic"
};

var shaderPaddle = {
    vertexName: "vertexShaderPaddle",
    fragmentName: "fragmentShaderPaddle"
};

function setupRenderer() {
    renderer = new THREE.WebGLRenderer();
    //						color     alpha
    renderer.setClearColor( 0x000000, 0.5 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = 0;
    camera.position.y = -100;
    camera.position.z = 40;
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
    //console.log(points);
    uniforms.u_time.value += 0.05;

    renderer.render(scene, camera);
}

function init(){
    scene = new THREE.Scene();

    //camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    setupRenderer();
    setupCamera();

    userPaddle = createBox(20, 2.5, 2, shaderPaddle, new THREE.Vector3(0,-40,0));

    //paddlePosition(userPaddle);

    ball = createBall(2);
    wall = createWall();
    border = createLine();
    backdrop = createBackground();
    createPlane();
    createBldgWall();

    playSound('assets/music/nukumachi.mp3');

    //console.log(ball.geometry.vertices);


    document.body.appendChild( renderer.domElement );

    // Call render
    render();
}

function displayScore(){
    return points;
}

function playSound(soundEffectPath){
    //Create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

// create a global audio source
    var sound = new THREE.Audio( listener );

    var audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
    audioLoader.load( soundEffectPath, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();
    });

}

function loadBackgroundMusic(){
    //Create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

// create a global audio source
    var sound = new THREE.Audio( listener );


    var audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
    audioLoader.load( 'assets/music/nukumachi.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(false);
        sound.setVolume(0.4);
        sound.play();
    });
}

function hintMenu(){
    var x = document.getElementById('hintMenu');
    if(x.style.display === 'none'){
        x.style.display = 'block';
    } else{
        x.style.display = 'none';
    }
}

window.onload = init();