//declaring the character objects
const characterOne = {
    health: 100,
    attack: 13,
    counterAttack: 10
};

const characterTwo = {
    health: 120,
    attack: 10,
    counterAttack: 15
};

const characterThree = {
    health: 140,
    attack: 14,
    counterAttack: 20
};

const characterFour = {
    health: 160,
    attack: 12,
    counterAttack: 25
};

//declaring the global variables
let chosenCharacter = undefined;
let chosenEnemy = undefined;
let npcCharacters = [characterOne, characterTwo, characterThree, characterFour];

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