// ###############################################################################################
//                                      DOM POPULATOR:                  
// ###############################################################################################
let SELECTED_CARDS = [];

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

    for(let i = 0; i < Number(howManyCardShouldBeGenerated); i++) {
        card = document.createElement("div");

        let image = document.createElement("img")
        image.src = "../assets/front.png";
        image.alt = "parrot draw";
        image.id = "static-img";

        let gif = document.createElement("img");
        gif.src = i < (Number(howManyCardShouldBeGenerated)/2) 
            ? randomImagePathOne[i]
            : randomImagePathTwo[i - (Number(howManyCardShouldBeGenerated))/2];
    
        gif.alt = "Card gif";
        gif.className = "hidden";
        gif.id = "gif";

        /* card.onclick = cardGenerator; */
        card.appendChild(image);
        card.appendChild(gif);
        card.className = 'unactive';
        card.onclick = cardActivator;
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



function cardActivator() {
    if(SELECTED_CARDS.length === 2 || this.className === "active") { // prevents from adding the same card to the SELECTED_CARDS array
        return;
    }
    console.log("ativei")
    card = this;
    card.className = "active";
    card.querySelector("#gif").classList.toggle("hidden")
    card.querySelector("#static-img").classList.toggle("hidden")

    SELECTED_CARDS.push(card);
    parityChecker();
}

function parityChecker() {
    freezeInterface();
    if(SELECTED_CARDS.length === 2) {
        if(SELECTED_CARDS[0].querySelector("#gif").src === SELECTED_CARDS[1].querySelector("#gif").src) {
            SELECTED_CARDS[0].onclick = null;
            SELECTED_CARDS[1].onclick = null;
            resetSelectedCards();
        } else {
            setTimeout(() => {
                SELECTED_CARDS[0].querySelector("#gif").className = "hidden";
                SELECTED_CARDS[0].querySelector("#static-img").className = "";
                SELECTED_CARDS[0].className = "unactive";
    
                SELECTED_CARDS[1].querySelector("#gif").className = "hidden";
                SELECTED_CARDS[1].querySelector("#static-img").className = "";
                SELECTED_CARDS[1].className = "unactive";
                resetSelectedCards();
            }, 1300);
        }
    }
}

function resetSelectedCards() {
    SELECTED_CARDS = [];
}

function freezeInterface() {
    document.querySelectorAll("unactive").onclick = null;
}

