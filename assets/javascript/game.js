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


loadNPCs();
document.getElementById("ready-to-play").addEventListener("click", function(){
    setupPlayArea();
    isPlayable = true;
})


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
                document.getElementById("player").innerHTML = `<h1>Game over you died! your heath was: ${chosenCharacter.health}</h1>`;
                chosenCharacter = undefined;
                endgame();
            }
            //if the Enemy's health is less than or equals 0 meaning you killed the enemy!
            else if(chosenEnemy.health <= 0){

                //get the enemy div and remove it if they have died
                const defenderDiv = document.getElementById("defender");
                defenderDiv.remove();
                // `<h1>You have killed: ${chosenEnemy.name}</h1>`;

                //set the enemy to undefined signaling that you have no one to fight
                chosenEnemy = undefined;

                //if no characters are in the array you win!
                if(npcCharacters.length === 0){
                    alert("You Win!!!")
                    endgame();
                }
            }
        }
    })
}

function endgame(){
    arenaDiv.innerHTML = `
    <div id="welcome">
        <h1>Welcome to the Minecraft RPG!</h1>
        <p>
            How to play, click on the character that you would like to be your avatar for the rest of the game. any avatars left will become your enemy's and you have to defeat all of them to win the game. once you click the ready to play button below you will see your attack button, choose your opponent and get playing!!
        </p>
        <button id="ready-to-play">Ready To Play!</button>
    </div>
    `;
    npcCharacters = [characterOne, characterTwo, characterThree, characterFour];
    loadNPCs();
}

//this creates a parent div that is 33.3% wide to make the play area look better for fighting
function createThirdWide(id, childDiv){
    let newWideDiv = document.createElement("div");
    newWideDiv.classList.add("third-wide");
    newWideDiv.id = id;
    newWideDiv.appendChild(childDiv);
    return newWideDiv;
}

//creates character div's so I don't have to copy and paste the same code about a million times
function createDiv(char, id, healthID){
    let playerDiv = document.createElement("div");
    playerDiv.setAttribute("character", char.name);
    playerDiv.classList.add("character");
    playerDiv.id = id;
    playerDiv.innerHTML = `<h4 id="name-text">${char.name}</h4><img class="character-img" src="${char.img}"><h4${healthID}>Health: ${char.health}</h4>`;
    return playerDiv;
}

//updates the health of the player and enemy so that the player can see what is going on
function updateHealthID(){
    document.getElementById("character-health").textContent = `Health: ${chosenCharacter.health}`;
    document.getElementById("enemy-health").textContent = `Health: ${chosenEnemy.health}`;
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

