// ###############################################################################################
//                                      DOM POPULATOR:                  
// ###############################################################################################


const IMAGES_PATH = [
    "../assets/gif/bobrossparrot.gif",
    "../assets/gif/explodyparrot.gif",
    "../assets/gif/fiestaparrot.gif",
    "../assets/gif/metalparrot.gif",
    "../assets/gif/revertitparrot.gif",
    "../assets/gif/tripletsparrot.gif",
    "../assets/gif/unicornparrot.gif",
]

firstInteractioManager();

function firstInteractioManager() {
    const howManyCards = prompt("Com quantas cartas você quer jogar?");
    inputPromptValidator(howManyCards);
}


/** 
 * Create the cards for the game and inserts it on DOM
 * @param {String} howManyCardShouldBeGenerated users input
 */
function cardGenerator(howManyCardShouldBeGenerated) {
    const mainTag = document.querySelector("main");

    const randomImagePathOne = shuffleArray(IMAGES_PATH, Number(howManyCardShouldBeGenerated)/2);
    const randomImagePathTwo = shuffleArray(randomImagePathOne, randomImagePathOne.length);
    console.log("randomImagePathTWO: ")
    console.log(randomImagePathTwo)

    for(let i = 0; i < Number(howManyCardShouldBeGenerated); i++) {
        card = document.createElement("div");

        let image = document.createElement("img")
        image.src = "../assets/front.png";
        image.alt = "parrot draw";

        let gif = document.createElement("img");
        gif.src = i < (Number(howManyCardShouldBeGenerated)/2) 
            ? randomImagePathOne[i]
            : randomImagePathTwo[i - (Number(howManyCardShouldBeGenerated))/2];
    
        gif.alt = "Card gif";
        gif.className = "hidden"

        /* card.onclick = cardGenerator; */
        card.appendChild(image);
        card.appendChild(gif);
        mainTag.appendChild(card);
    }
}

/** 
 * Verify if the input value is not empty, too big, too low or not a number
 * @param {String} inputValue the value iserted in the first prompt
 */
function inputPromptValidator(inputValue) {
    if(inputValue.trim() === "" ||
        isNaN(inputValue.trim()) ||
        parseInt(inputValue.trim()) > 14 ||
        parseInt(inputValue.trim()) < 4 ||
        !isEven(Number(inputValue)))
    {
        tryAnotherInput();
    } else {
        cardGenerator(inputValue)
    }
}

function tryAnotherInput() {
    const newInputTry = prompt("Insira um valor par válido, de 4 a 14")
    inputPromptValidator(newInputTry);
}


function isEven(value) {
    if((value % 2) === 0) return true;
    return false;
}


/** 
 * Fisher-Yates algorithm, wich randomly shuffles an array (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * @param {String[]} array the array that will me shuffled
 * @param {Number} length how many items must be shuffled
 * @return {String[]} the shuffled array with the specified length
 */
function shuffleArray(array, length) {
    const shuffledArray = [];
    const inputArrayCopy = Array.from(array);

    for(let i = 0; i < length; i++) {
        const selectedIndex = Math.floor(Math.random() * (inputArrayCopy.length - 0) + 0);
        shuffledArray[i] = inputArrayCopy[selectedIndex];

        inputArrayCopy.splice(selectedIndex, 1);
    }
    return shuffledArray;
}


// ###############################################################################################
//                                      GAME LOGIC:                
// ###############################################################################################


