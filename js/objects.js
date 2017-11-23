function createBackground(){

    var texture = THREE.ImageUtils.loadTexture('assets/images/cyberpunk.jpg');
    var geo = new THREE.BoxGeometry(1500, 2, 1000);
    var mat = new THREE.MeshBasicMaterial( {color: 0xd3d3d3, side: THREE.DoubleSide, map:texture} );
    var plane = new THREE.Mesh(geo, mat);

    scene.add(plane);

    plane.position.y = 300;
    plane.position.x = -100;
    plane.position.z = -150;
    plane.rotation.x = THREE.Math.degToRad(-20);
}

function createPlane(){
    var mat = new THREE.MeshBasicMaterial({ color: 0x1C1439 });
    var geo = new THREE.PlaneGeometry(110, 75, 7);

    var groundPlane = new THREE.Mesh(geo, mat);

    scene.add(groundPlane);
    groundPlane.position.z = -2;
    groundPlane.position.y = -2;
}

function createBldgWall(){
    var mat = new THREE.MeshBasicMaterial({ color: 0x1C1439 });
    var geo = new THREE.PlaneGeometry(110, 75, 7);

    var groundPlane = new THREE.Mesh(geo, mat);

    scene.add(groundPlane);

    groundPlane.rotation.x = THREE.Math.degToRad(70);
    groundPlane.position.y = -52;
    groundPlane.position.z = -36.5;
}

function createLine() {
    var mat = new THREE.LineBasicMaterial({ color: 0x000000 });
    var geo = new THREE.Geometry();

    geo.vertices.push(new THREE.Vector3(-55, 30, 0));
    geo.vertices.push(new THREE.Vector3(55, 30, 0));
    geo.vertices.push(new THREE.Vector3(55, -40, 0));
    geo.vertices.push(new THREE.Vector3(-55, -40, 0));
    geo.vertices.push(new THREE.Vector3(-55, 30, 0));

    var line = new THREE.Line(geo, mat);
    scene.add(line);

    return {
        maxX: 53,
        maxY: 28,
        minX: -53,
        minY: -38,
        maxZ: 0,
        minZ: 0
    };
}

function createBox(width, height, depth, shader, position){
    var geo = new THREE.BoxGeometry(width, height, depth);
    var mat = customMat(shader.vertexName, shader.fragmentName);
    cube = new THREE.Mesh(geo, mat);




    scene.add(cube);
    cube.position.set(position.x, position.y, position.z);
    cube.boundaryMinX = cube.position.x - (width / 2);
    cube.boundaryMaxX = cube.position.x + (width / 2);
    cube.boundaryMinY = cube.position.y - (height / 2);
    cube.boundaryMaxY = cube.position.y + (height / 2);

    console.log(cube.position);

    return cube;
}

function paddlePosition(object){
    object.position = position;
    object.boundaryMinX = cube.position.x - (width / 2);
    object.boundaryMaxX = cube.position.x + (width / 2);
    object.boundaryMinY = cube.position.y - (height / 2);
    object.boundaryMaxY = cube.position.y + (height / 2);
}

function createBall(radius){
    var ballGeo = new THREE.SphereGeometry(radius);
    var ballMat = customMat('vertexShaderPulse', 'fragmentShaderPulse');
    var ball = new THREE.Mesh(ballGeo, ballMat);

    ball.position.x = 0;

    scene.add(ball);

    return ball;
}

var pieceLength = 10;
var pieceHeight = 2.5;
var pieceDepth = 2;
var pieceColor = 0xfffff0;

function createWall(){
    var wallPieces = [];

    for(var i = 30; i > 10; i = i - 3) {
        for(var j = -50; j < 50; j += 11) {
            var wallPiece = createBox(pieceLength, pieceHeight, pieceDepth, shaderWall, new THREE.Vector3(j, i, 0));
            wallPiece.hitCount = 0;
            collidableMeshList.push(wallPiece);
            wallPieces.push(wallPiece);
        }
    }


    return wallPieces;
}