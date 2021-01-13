var ball,database,pos;

function setup(){
    database=firebase.database();

    createCanvas(500,500);
    
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballposition = database.ref('ball/position');
    ballposition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        x:pos.x+x,
        y:pos.y+y
    })
}

function readPosition(data){
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;
}


function showError(){
    console.log("There is some error! Please check your code");
}

//.ref - refer to the database
//.on - monitor the data in database
//.set/update - update the values in database
//.val - to extract the value from database
