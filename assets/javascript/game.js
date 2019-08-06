//declaring the character objects
const characterOne = {
    name: "Steve",
    img: "./assets/images/steve.png",
    health: 130,
    attack: 8,
    counterAttack: 7
};

const characterTwo = {
    name: "Skeleton",
    img: "./assets/images/skeleton.png",
    health: 120,
    attack: 5,
    counterAttack: 12
};

const characterThree = {
    name: "Creeper",
    img: "./assets/images/creeper.png",
    health: 140,
    attack: 7,
    counterAttack: 16
};

const characterFour = {
    name: "Zombie",
    img: "./assets/images/zombie.png",
    health: 160,
    attack: 6,
    counterAttack: 20
};

//declaring the global variables
let chosenCharacter = undefined;
let chosenEnemy = undefined;
let isPlayable = false;
let npcCharacters = [characterOne, characterTwo, characterThree, characterFour];


//call elements from the document into global const variables 
const selectCharacter = document.getElementById("character-select");
const arenaDiv = document.getElementById("arena");


//load the NPC's on page load 
loadNPCs();

//add click event to the "Ready To Play!" button
document.getElementById("ready-to-play").addEventListener("click", function(){
    //sets up the play area and sets the is playable lock to true so the user may choose a character 
    setupPlayArea();
    isPlayable = true;
})


//initialize the characters and display them on the page
function loadNPCs(){
    npcCharacters.forEach(char => {
        //create new div html element for each char
        let newDiv = createDiv(char, "", "");

        //set a click event listener for each new div so the player can choose 
        newDiv.addEventListener("click", function(){
            if (isPlayable === false) return;
            chosenCharacter = char;
            characterSelection(char);

            //create new div for the character and set all classes, attribute's and innerHTML so it can be shown in the player div on the page properly
            let playerDiv = createDiv(chosenCharacter, "player", ` id="character-health"`);
            playerDiv.classList.add("vs");
            let newWideDiv = createThirdWide("player-attack", playerDiv);

            //adding the newly created character div and clearing the character-select div
            arenaDiv.prepend(newWideDiv);
            selectCharacter.innerHTML = "";

            //once the player is setup, setup the enemy's
            setupEnemys();
        })

        //adding the div to the page 
        selectCharacter.appendChild(newDiv);
    });
}


//sets up the enemy's after the player has chosen there character
function setupEnemys(){
    npcCharacters.forEach(enemy => {
        let newDiv = createDiv(enemy, "", "");

        newDiv.addEventListener("click", function(){
            if(chosenEnemy === undefined){
                chosenEnemy = enemy;
                characterSelection(chosenEnemy);

                //remove the previous death message if there is one
                const defenderDiv = document.getElementById("defender");
                if (defenderDiv !== null) defenderDiv.remove();

                //create new div for the character and set all classes, attribute's and innerHTML so it can be shown in the player div on the page properly
                selectCharacter.innerHTML = ""
                let enemyDiv = createDiv(chosenEnemy, "defender", ` id="enemy-health"`);
                enemyDiv.classList.add("vs");
                let newWideDiv = createThirdWide("enemy-defender", enemyDiv);

                //adding the newly created enemy div to the defence div and clearing the character-enemy div so it can be refreshed
                arenaDiv.appendChild(newWideDiv);
                selectCharacter.innerHTML = "";

                setupEnemys();
            }
        })
        selectCharacter.appendChild(newDiv);
    });
}


// setup the play area once the user has read the rules and is ready to play!
function setupPlayArea(){
    //clear the arena div so the play field is clean for the new Attack button 
    arenaDiv.innerHTML = "";

    //create the div for the aattack button and swords 
    let newDiv = document.createElement("div");
    newDiv.id = "vs";

    //create the image tag so the swords can be brought in
    let swordsImg = document.createElement("img");

    //add in the line brake so the button and image line up correctly 
    let lineBreak = document.createElement("br");
    
    //set the image src/url and the width of the image
    swordsImg.src = "./assets/images/swords.png";
    swordsImg.width = "100";

    //create the attack button, set the text, and the id to attack
    let attackButton = document.createElement("button");
    attackButton.innerText = "Attack!";
    attackButton.id = "attack";

    // create the listener on the attack button so when you click it. it will do the attack
    createAttackListener(attackButton);

    //adding the elements we just created to the div as children
    newDiv.appendChild(swordsImg);
    newDiv.appendChild(lineBreak);
    newDiv.appendChild(attackButton);

    //create the 1/3 div in the attack area so the arena looks right when adding characters, and adding the newly created div from above to this new third wide div
    let newWideDiv = createThirdWide("attack-button", newDiv);

    //adding the new wide div to the arena div
    arenaDiv.appendChild(newWideDiv)
}


//creates a listener on the attack button 
function createAttackListener(attackButton){
    attackButton.addEventListener("click", function(){
        //if there is no character's or enemy's dont attack
        if(chosenCharacter !== undefined && chosenEnemy !== undefined){

            //adding more attack to the player
            chosenCharacter.attack = attackMultiplier(chosenCharacter);

            //attacking the enemy and updating the health of the of both so it is displayed on the page
            attack(chosenCharacter, chosenEnemy);
            updateHealthID();

            //if the character's health is less than or equals 0 meaning you died!
            if(chosenCharacter.health <= 0){
                //create a new div to replace the arena that signals the player has died
                let newDiv = document.createElement("div");
                newDiv.innerHTML = `<h1>Game over you died! your heath was: ${chosenCharacter.health}</h1>`;
                newDiv.className = "death-message";

                //clear all html out of the arena and set the Character to undefined
                arenaDiv.innerHTML = "";
                chosenCharacter = undefined;

                //create a new button that asks the user if they would like to replay
                let newButton = document.createElement("button");
                newButton.textContent = "Replay?";
                newButton.className = "attack";
                newButton.addEventListener("click", function(){
                    endgame();
                })

                //appending the button to the new div and then appending the new div to the arena
                newDiv.appendChild(newButton);
                arenaDiv.appendChild(newDiv);
                
            }
            //if the Enemy's health is less than or equals 0 meaning you killed the enemy!
            else if(chosenEnemy.health <= 0){

                //get the enemy div and remove it if they have died
                const defenderDiv = document.getElementById("defender");
                defenderDiv.innerHTML = `<h1>You have killed: ${chosenEnemy.name}</h1>`;
                defenderDiv.className = "death-message";

                //set the enemy to undefined signaling that you have no one to fight
                chosenEnemy = undefined;

                //if no characters are in the array you win!
                if(npcCharacters.length === 0){
                    let newDiv = document.createElement("div");
                    newDiv.innerHTML = `<h1>Game over, YOU WIN! your heath was: ${chosenCharacter.health}</h1>`;
                    newDiv.className = "death-message";

                    //clear all html out of the arena and set the Character to undefined
                    arenaDiv.innerHTML = "";
                    chosenCharacter = undefined;

                    //create a new button that asks the user if they would like to replay
                    let newButton = document.createElement("button");
                    newButton.textContent = "Replay?";
                    newButton.className = "attack";
                    newButton.addEventListener("click", function(){
                        endgame();
                    })

                    //appending the button to the new div and then appending the new div to the arena
                    newDiv.appendChild(newButton);
                    arenaDiv.appendChild(newDiv);
                }
            }
        }
    })
}


//to end the game
function endgame(){
    //set the character and enemy to undefined and make the game not playable
    chosenCharacter = undefined;
    chosenEnemy = undefined;
    isPlayable = false;

    //empty the arena and the selectCharacter Div
    arenaDiv.innerHTML = "";
    selectCharacter.innerHTML = "";

    //create the welcome menu and append it to the arena
    let welcomeMenu = createWelcomeMenu();
    arenaDiv.appendChild(welcomeMenu);

    //reset the NPC's stats back to default and reset the npcCharacters array
    resetNpc();
    npcCharacters = [characterOne, characterTwo, characterThree, characterFour];

    //load the NPC's for the player to choose from at the beginning of the game
    loadNPCs();
}


// re-create the welcome menu that is shown on page load
function createWelcomeMenu(){

    //create the main div to house the menu and set said div's id
    let newDiv = document.createElement("div");
    newDiv.id = "welcome";

    //create the menu's title text h1 tag and set its inner tex and the class name
    let newHOne = document.createElement("h1");
    newHOne.className = "title";
    newHOne.innerText = "Welcome to the Minecraft RPG!";

    //create the paragraph html element and set its text 
    let newParagraph = document.createElement("p");
    newParagraph.innerText = "How to play, click on the character that you would like to be your avatar for the rest of the game. any avatars left will become your enemy's and you have to defeat all of them to win the game. once you click the ready to play button below you will see your attack button, choose your opponent and get playing!!";
    
    //create the play button set its text to "Ready To Play!" and its id as well as add a click listener for it
    let newPlayButton = document.createElement("button");
    newPlayButton.innerText = "Ready To Play!";
    newPlayButton.id = "ready-to-play";
    newPlayButton.addEventListener("click", function(){
        //setting up the play area and set is playable to true so the user may choose a character
        setupPlayArea();
        isPlayable = true;
    })

    //append all of the elements we just created to the main div and return the newDiv so it can be used back where this function was called
    newDiv.appendChild(newHOne);
    newDiv.appendChild(newParagraph);
    newDiv.appendChild(newPlayButton);
    return newDiv;
}


//this creates a parent div that is 33.3% wide to make the play area look better for fighting
function createThirdWide(id, childDiv){
    //create a new div and add a class pf "third-wide"
    let newWideDiv = document.createElement("div");
    newWideDiv.classList.add("third-wide");

    //set the id to the passed in value and appending the passing div to this new div
    newWideDiv.id = id;
    newWideDiv.appendChild(childDiv);

    //returning the new wide div so that it may be worked with outside the function
    return newWideDiv;
}


//creates character div's so I don't have to copy and paste the same code about a million times
function createDiv(char, id, healthID,attack){
    //create the player div and setting the attribute of the character's name
    let playerDiv = document.createElement("div");
    playerDiv.setAttribute("character", char.name);

    //setting the class of character and the passed in id for the div
    playerDiv.classList.add("character");
    playerDiv.id = id;

    //setting the inner html of the new div we just made and returning the new div so it can be worked with outside the function
    playerDiv.innerHTML = `<h4 id="name-text">${char.name}</h4><img class="character-img" src="${char.img}"><h4${healthID}>HP: ${char.health} / Atk: ${char.attack}</h4>`;
    return playerDiv;
}


//updates the health of the player and enemy so that the player can see what is going on
function updateHealthID(){
    document.getElementById("character-health").textContent = `HP: ${chosenCharacter.health} / Atk: ${chosenCharacter.attack}`;
    document.getElementById("enemy-health").textContent = `HP: ${chosenEnemy.health} / Atk: ${chosenEnemy.counterAttack}`;
}


//subtract the attack and counter attack from players health and enemy's health
function attack(player, enemy){
    enemy.health -= player.attack;
    player.health -= enemy.counterAttack;
}


//this function resets the play area variables
function resetPlayArea(){
    chosenCharacter = undefined;
    chosenEnemy = undefined;
    npcCharacters = [characterOne, characterTwo, characterThree, characterFour];
}


//get the index of the char in the npc char array and remove the char from the array to signal that the char has been chosen in one way or another
function characterSelection(obj){
    const index = npcCharacters.indexOf(obj);
    npcCharacters.splice(index,1);
}


//adding more attack points to the passed in character variable between 0 and the character's current attack level
function attackMultiplier(char){
    return char.attack + 6;
}


function resetNpc(){
    //resetting CharacterOne's stats
    characterOne.health = 130;
    characterOne.attack = 8;
    characterOne.counterAttack = 7;

    //resetting characterTwo's stats
    characterTwo.health = 120;
    characterTwo.attack = 5;
    characterTwo.counterAttack = 12;
    
    //resetting characterTwo's stats
    characterThree.health = 140;
    characterThree.attack = 7;
    characterThree.counterAttack = 16;
    
    //resetting characterTwo's stats
    characterFour.health = 160;
    characterFour.attack = 6;
    characterFour.counterAttack = 20;
}