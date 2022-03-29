var db;
var bgIMG;
var form, game, player;
var pc, gs, allPlayers;
var car1, car2;
var car1Img, car2Img, trackImg;
var cars=[];
var fuelIMG, coinIMG, ob1IMG, ob2IMG;
var fuelGroup, coinGroup, obstacleGroup;

function preload(){
    bgIMG = loadImage("Iages/background.png");
    car1Img = loadImage("Iages/car1.png");
    car2Img = loadImage("Iages/car2.png");
    trackImg = loadImage("Iages/track.jpg");
    coinIMG = loadImage("Iages/goldCoin.png");
    fuelIMG = loadImage("Iages/fuel.png");
    ob1IMG = loadImage("Iages/obstacle1.png");
    ob2IMG = loadImage("Iages/obstacle2.png");

}

function setup(){
    db = firebase.database()

    createCanvas(windowWidth,windowHeight);
    game=new Game();
    game.getState();
    game.start();
}

function draw(){
    background(bgIMG);
    if(pc === 2){
        game.update(1);
    }
    if(gs === 1){
        game.play();
    }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

/*
READ and WRITING

.ref() - refers to the field that we want to change/read

.on() - Reader - turns on a listener that listens to the changes in value
        - function to read the value
        - function to check for errors in db --> not compulsory

.set() - Writer - changes/updates the value
*/

/*
CAR RACING GAME
    1. Form:
        - Username - input box
        - Button - play/ready
        - Store name in the database
    2. Player:
        - Storing info of the player:
            - Name
            - Rank
            - Score 
            - Distance/Laps
        - Write info into the database
    3. Game:
        - game states
            - Wait - 0
            - Play - 1
            - End - 2
        - Reading/writing game state info from database


*/