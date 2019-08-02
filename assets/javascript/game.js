//declaring the character objects
const characterOne = {
    health: 100,
    attack: 12,
    counterAttack: 10
};

const characterTwo = {
    health: 120,
    attack: 12,
    counterAttack: 15
};

const characterThree = {
    health: 140,
    attack: 12,
    counterAttack: 20
};

const characterFour = {
    health: 160,
    attack: 12,
    counterAttack: 25
};




//adding more attack points to the passed in character variable between 0 and the character's current attack level
function attackMultiplier(char){
    return char.attack + Math.floor(Math.random() * char.attack);
}