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
let npcCharacters = [characterOne, characterTwo, characterThree, characterFour];


//call elements from the document into global const variables 
const selectCharacter = document.getElementById("character-select");
const charPlayer = document.getElementById("character-player")
const charDefence = document.getElementById("character-defence");


//initialize the characters and display them on the page
npcCharacters.forEach(char => {
    //create new div html element for each char
    let newDiv = createDiv(char, "", "");

    //set a click event listener for each new div so the player can choose 
    newDiv.addEventListener("click", function(){
        chosenCharacter = char;
        characterSelection(char);

        //create new div for the character and set all classes, attribute's and innerHTML so it can be shown in the player div on the page properly
        let playerDiv = createDiv(chosenCharacter, "player", ` id="character-health"`);

        //adding the newly created character div and clearing the character-select div
        charPlayer.appendChild(playerDiv);
        selectCharacter.innerHTML = "";

        //once the player is setup, setup the enemy's
        setupEnemys();
    })

    //adding the div to the page 
    selectCharacter.appendChild(newDiv);
});


//sets up the enemy's after the player has chosen there character
function setupEnemys(){
    npcCharacters.forEach(enemy => {
        let newDiv = createDiv(enemy, "", "");

        newDiv.addEventListener("click", function(){
            if(chosenEnemy === undefined){
                chosenEnemy = enemy;
                characterSelection(chosenEnemy);
                //create new div for the character and set all classes, attribute's and innerHTML so it can be shown in the player div on the page properly
                charDefence.innerHTML = ""
                let enemyDiv = createDiv(chosenEnemy, "defender", ` id="enemy-health"`);

                //adding the newly created enemy div to the defence div and clearing the character-enemy div so it can be refreshed
                charDefence.appendChild(enemyDiv);
                selectCharacter.innerHTML = "";

                setupEnemys();
            }
        })
        selectCharacter.appendChild(newDiv);
    });
}

document.getElementById("attack").addEventListener("click", function(){
    if(chosenCharacter !== undefined && chosenEnemy !== undefined){
        chosenCharacter.attack = attackMultiplier(chosenCharacter);
        attack(chosenCharacter, chosenEnemy);
        updateHealthID();
        if(chosenCharacter.health < 0){
            charPlayer.innerHTML = `<h1>Game over you died! your heath was: ${chosenCharacter.health}</h1>`;
            chosenCharacter = undefined
        } else if(chosenEnemy.health < 0){
            charDefence.innerHTML = `<h1>You have killed: ${chosenEnemy.name}</h1>`;
            chosenEnemy = undefined;
            if(npcCharacters.length === 0){
                alert("You Win!!!")
            }
        }
    }
})

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
    document.getElementById("character-health").textContent = `${chosenCharacter.name} Health: ${chosenCharacter.health}`;
    document.getElementById("enemy-health").textContent = `${chosenEnemy.name} Health: ${chosenEnemy.health}`;
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

