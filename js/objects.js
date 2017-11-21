

function createLine() {
    var mat = new THREE.LineBasicMaterial({ color: 0x0000ff });
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

function createBox(width, height, depth, color, position){
    var geo = new THREE.BoxGeometry(width, height, depth);
    var mat = new THREE.MeshBasicMaterial({color: color});
    var cube = new THREE.Mesh(geo, mat);

    cube.position = position;
    cube.boundaryMinX = cube.position.x - (width / 2);
    cube.boundaryMaxX = cube.position.x + (width / 2);
    cube.boundaryMinY = cube.position.y - (height / 2);
    cube.boundaryMaxY = cube.position.y + (height / 2);

    scene.add(cube);

    return cube;
}

function createBall(radius){
    var ballGeo = new THREE.SphereGeometry(radius);
    var ballMat = new THREE.MeshBasicMaterial({color: 0x0ff000});
    var ball = new THREE.Mesh(ballGeo, ballMat);

    ball.position.x = 0;

    scene.add(ball);

    return ball;
}

var pieceLength = 10;
var pieceHeight = 2.5;
var pieceDepth = 2;
var pieceColor = 0xfff000;

function createWall(){
    var wallPieces = [];

    for(var i = 30; i > 10; i = i - 3) {
        for(var j = -50; j < 50; j += 11) {
            var wallPiece = createBox(pieceLength, pieceHeight, pieceDepth, pieceColor, new THREE.Vector3(j, i, 0));
            wallPiece.hitCount = 0;
            collidableMeshList.push(wallPiece);
            wallPieces.push(wallPiece);
        }
    }


    return wallPieces;
}