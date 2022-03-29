class Form{
    constructor(){
        this.input = createInput("").attribute("placeholder", "Enter your name");
        this.playButton = createButton("Play");
        this.titleIMG = createImg("Iages/title.png","game title");
        this.greeting = createElement("h3");
    }

    setElementsPosition(){
        this.titleIMG.position(120, 50);
        this.input.position(width/2-100,height/2-100);
        this.playButton.position(width/2-80,height/2-40);
        this.greeting.position(width/2-300,height/2-100);
    }

    setElementsStyle(){
        this.titleIMG.class("gameTitle");
        this.input.class("customInput");
        this.greeting.class("greeting");
        this.playButton.class("playButton");
    }
    
    hide(){
        this.input.hide();
        this.playButton.hide();
        this.greeting.hide();
    }

    display(){
        this.setElementsPosition()
        this.setElementsStyle()
        this.handleMousePressed()
    }

    handleMousePressed(){
        this.playButton.mousePressed(() => {
            //form.playButton.hide()
            //playButton.playButton.hide() - problem
            this.playButton.hide();
            //playButton.input.hide() - problem
            this.input.hide();
            var message = "Hello, "+ this.input.value() + "! Waiting for other player.....";
            this.greeting.html(message);

            //Updating info of the new player into the db
            pc = pc+1
            player.updateCount(pc);
            player.name = this.input.value();
            player.index = pc;
            player.addPlayer();
            player.getDistance();
        })
    }
}


/*
Arrow Function - Binds the function/property to the original object that calls it - not the immediate object
    name = () => {}

HTML - creates web pages
    1. Head - Info about the page
    2. Body - visible content on the screen

    Elements of the body:
        1. Heading - h1, h2... h6
        2. Input - username of the player
        3. button - Ready/play

    DOM - Document Object Model - Library p5.dom
*/


