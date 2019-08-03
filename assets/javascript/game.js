//declaring the character objects
const characterOne = {
    name: "characterOne",
    img: "./assets/images/steve.png",
    health: 100,
    attack: 13,
    counterAttack: 10
};

const characterTwo = {
    name: "characterTwo",
    img: "./assets/images/Skeleton.png",
    health: 120,
    attack: 10,
    counterAttack: 15
};

const characterThree = {
    name: "characterThree",
    img: "./assets/images/Creeper.png",
    health: 140,
    attack: 14,
    counterAttack: 20
};

const characterFour = {
    name: "characterFour",
    img: "./assets/images/zombie.png",
    health: 160,
    attack: 12,
    counterAttack: 25
};

//declaring the global variables
let chosenCharacter = undefined;
let chosenEnemy = undefined;
let npcCharacters = [characterOne, characterTwo, characterThree, characterFour];


//initialize the characters and display them on the page
npcCharacters.forEach(char => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("character", char.name);
    newDiv.classList.add("character");
    newDiv.innerHTML = `<h4>${char.name}</h4><img class="character-img" src="${char.img}">`;
    document.getElementById("character-select").appendChild(newDiv);
})


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
    return char.attack + Math.floor(Math.random() * char.attack);
}

