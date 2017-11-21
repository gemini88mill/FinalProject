var xDir = 0.2;
var yDir = 0.2;
var speedY = 0.2;

function paddleMovement(){
    if( Key.isDown( Key.A ) )
    {
        userPaddle.position.x -= 0.8;
    }
    else if( Key.isDown( Key.D ) )
    {
        userPaddle.position.x += 0.8;
    }
}

function ballMovement(){
    ball.position.x += xDir;
    ball.position.y += yDir;

    //if ball is out of bounds
    if(ball.position.x > border.maxX){
        //console.log("hello");
        xDir = -xDir;
    }else if(ball.position.x < border.minX){
        xDir = Math.abs(xDir);
    }else if(ball.position.y > border.maxY){
        yDir = -yDir - 0.05;

    }else if(ball.position.y < border.minY){

        if(Math.abs(userPaddle.position.x - ball.position.x) <= 10){
            if(userPaddle.position.x - ball.position.x > 0){
                yDir = Math.abs(yDir);
                xDir = -xDir - 0.04;
            }else{
                yDir = Math.abs(yDir);
                xDir = Math.abs(yDir) + 0.04;
            }

            // console.log(Math.abs(userPaddle.position.x - ball.position.x));
            // yDir = Math.abs(yDir) + 0.05;
            // xDir += 0.1;
        }else {
            ball.position.x = 0;
            ball.position.y = 0;
            speedY = 0.2;
        }
    }
}

function checkCollision(){
    var originPoint = ball.position.clone();

    for(var vertexIndex = 0; vertexIndex < ball.geometry.vertices.length; vertexIndex++){
        var localVertex = ball.geometry.vertices[vertexIndex].clone();
        var globalVertex = localVertex.applyMatrix4( ball.matrix );
        var directionVector = globalVertex.sub( ball.position );

        var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
        var collisionResults = ray.intersectObjects( wall );
        if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
            //console.log(collisionResults[0]);

            var id = collisionResults[0].object.id;
            //scene.remove(collisionResults[0].object);
            console.log(wall.hitCount);
            for(var i = 0; i < wall.length; i++){
                if(wall[i].id === id){
                    scene.remove(wall[i]);
                    wall.splice(i, 1);


                    // if(wall[i].hitCount > 200) {
                    //     scene.remove(wall[i]);
                    //     wall.splice(i, 1);
                    // }else{
                    //     wall[i].material.color.setHex( 0x00ff00);
                    //     wall[i].hitCount++;
                    // }
                }
            }

            speedY += 0.1;
            yDir = -yDir;

            if(yDir > 5){
                yDir = 0.2;
            }

            points += 100;
            document.getElementById('pointsDisplay').innerHTML = "Score: " + points;
        }

    }
}