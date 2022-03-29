class Game {
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
        this.leaderboardTitle = createElement("h2");
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
    }

    //To read the gamestate from the db
    getState(){
        db.ref("gameState").on("value",(data)=>{
            gs = data.val();
        })
    }

    //to update changes to gamestate in db
    update(state){
        db.ref("/").update({
            gameState: state
        })
    }

    //Wait state - 0 state
    start(){
        form = new Form();
        form.display();
    
        player = new Player();
        player.getCount();

        car1 = createSprite(width/2-50,height-100);
        car1.addImage(car1Img);
        car1.scale = 0.07;
        
        car2 = createSprite(width/2+50,height-100);
        car2.addImage(car2Img);
        car2.scale = 0.07
        
        cars = [car1,car2];

        fuelGroup = new Group();
        coinGroup = new Group();
        obstacleGroup = new Group();

        //Spawning fuel tanks
        this.spawnRewards(fuelGroup, 5, fuelIMG, 0.02);
        //Spawning power coins
        this.spawnRewards(coinGroup, 10, coinIMG, 0.09);
    }
    
    handleElements(){
        form.hide()
        form.titleIMG.position(40,50);
        form.titleIMG.class("gameTitleAfterEffect");
        
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width/2+200,40);
        
        this.resetButton.position(width/2+230,100);
        this.resetButton.class("resetButton");

        this.leader1.class("leadersText")
        this.leader1.position(width/3-50, 80);

        this.leader2.class("leadersText")
        this.leader2.position(width/3-50, 130);

        this.leaderboardTitle.html("Leaderboard");
        this.leaderboardTitle.class("resetText");
        this.leaderboardTitle.position(width/3-60,40);
    }

    play(){
        this.handleElements()
        this.handleResetButton()
        Player.getPlayersInfo();
        
        if(allPlayers!==undefined){
            image(trackImg,0,-5*height,width,height*6);

            this.showLeaderboard();

            var carsIndex = 0;
            //allPlayers - array or array-like - JSON - JS object notation
            //for-in loop - specially for JSON
            for(var i in allPlayers){
                carsIndex = carsIndex + 1;

                var x = allPlayers[i].positionX;
                var y = height - allPlayers[i].positionY;

              
                cars[carsIndex-1].x = x;
                cars[carsIndex-1].y = y;

                //To check which player is active in the game
                if(carsIndex===player.index){
                    camera.position.x = cars[carsIndex-1].x;
                    camera.position.y = cars[carsIndex-1].y;
                }
            }
        }
        this.handlePlayerControls();        
        drawSprites();
    }
    
    end(){}

    handlePlayerControls(){
        if(keyIsDown(UP_ARROW)){
            player.positionY = player.positionY + 10;
            player.update()
        }
        if(keyIsDown(LEFT_ARROW) && player.positionX > width/3-50){
            player.positionX = player.positionX - 5;
            player.update();
        }
        if(keyIsDown(RIGHT_ARROW) && player.positionX < width/2+300){
            player.positionX = player.positionX + 5;
            player.update();
        }
    }

    showLeaderboard(){
        var leader1, leader2;
        /*
        {
            key1: value1,
            key2: value2,
            key3: value3
        }
        */
       //SToring only the values from allPlayers JSON object ==> var players is an array
        var players = Object.values(allPlayers)
        
        //leader1 = player1
        if((players[0].rank===0 && players[1].rank===0) || players[0].rank===1 ){
            //&emsp: -- empty space
            leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score;
            leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
        }
        
        //leader1 = player2
        if(players[1].rank===1){
            leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score;
            leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score; 
        }
        
        this.leader1.html(leader1);
        this.leader2.html(leader2);
            
    }

    handleResetButton(){
        this.resetButton.mousePressed(() => {
            db.ref("/").set({
                gameState: 0,
                playerCount: 0,
                players: {}
            })
            window.location.reload()
        })
    }

    spawnRewards(spriteGroup, numberOfSprites, spriteImage, scale){
        for(var i=0; i < numberOfSprites; i ++){
            var x, y;
            x = random(width/2 +100, width/2 - 100);
            y = random(- height *4, height-300);            
            var reward = createSprite(x, y);
            reward.addImage(spriteImage);
            reward.scale = scale;
            spriteGroup.add(reward);
            
        }
    }
}








