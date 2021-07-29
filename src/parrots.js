
let SELECTED_CARDS = [];
let PLAYER_MOVES = 0; // how many times the player flipped a card

const IMAGES_PATH = [
    "../assets/gif/bobrossparrot.gif",
    "../assets/gif/explodyparrot.gif",
    "../assets/gif/fiestaparrot.gif",
    "../assets/gif/metalparrot.gif",
    "../assets/gif/revertitparrot.gif",
    "../assets/gif/tripletsparrot.gif",
    "../assets/gif/unicornparrot.gif",
]

let TIME = 0;
let INTERVAL_ID;
const CLOCK_SCREEN = document.querySelector("#clock");

// Run app:
firstInteractionManager();

// ###############################################################################################
//                                      TIMER:                  
// ###############################################################################################

function startClock() {
   const intervalID =  setInterval(() => {
        TIME += 1;
        CLOCK_SCREEN.innerText =  parseIntTimeToString(TIME);
    }, 1000)

    return intervalID;
}

/** 
 * Parse an int value into a formated string to be displayed on HTML
 * @example parseIntToString(733); // "00:12:13"
 * @param {Number} intTime a time in seconds to be formated 
 * @return {String} a string in the format "xx:xx:xx"
 */
function parseIntTimeToString(intTime) {
    const intHours = parseInt(intTime / 3600);
    const intMinutes = parseInt((intTime - (intHours * 3600)) / 60);
    const intSeconds = intTime - ((intHours*3600) + (intMinutes*60));
    return `${intHours <= 9 ? "0"+intHours : intHours}:${intMinutes <= 9 ? "0"+intMinutes : intMinutes}:${intSeconds <= 9 ? "0"+intSeconds : intSeconds}`;
}



// ###############################################################################################
//                                      DOM POPULATOR:                  
// ###############################################################################################




function firstInteractionManager() {
    const howManyCards = prompt("Com quantas cartas você quer jogar?");
    inputPromptValidator(howManyCards);
};


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
        Number(inputValue) % 2)
    {
        tryAnotherInput();
    } else {
        cardGenerator(inputValue)
        INTERVAL_ID = startClock();
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


/** 
 * shows the gif image and stores the DOM element who called in SELECTED_CARDS
 * @return {void} void
 */
function cardActivator() {
    if(SELECTED_CARDS.length === 2 || this.className === "active") { // prevents from adding the same card to the SELECTED_CARDS array
        return;
    }

    PLAYER_MOVES += 1;

    card = this; // Element who called the function
    card.className = "active";
    card.querySelector("#gif").classList.toggle("hidden")
    card.querySelector("#static-img").classList.toggle("hidden")

    SELECTED_CARDS.push(card);
    parityChecker();
}


/** 
 * When two cards are selected, verifyes if both of them have the same gif, freezing them if they have.
 * otherwise, just waits 1 second, reseting SELECTED_CARDS and its items to the previous state .
 */
function parityChecker() {
    if(SELECTED_CARDS.length === 2) {
        if(SELECTED_CARDS[0].querySelector("#gif").src === SELECTED_CARDS[1].querySelector("#gif").src) {
            SELECTED_CARDS[0].onclick = null;
            SELECTED_CARDS[1].onclick = null;
            resetSelectedCardsArray();
            endGameManager();
        } else {
            setTimeout(() => {
                resetSelectedItems();
                resetSelectedCardsArray();
            }, 1000);
        }
    }
}

/** 
 * Resets the cards and all its relevants children to the initial state
 * @return {void} void
 */
function resetSelectedItems() {
    SELECTED_CARDS[0].querySelector("#gif").className = "hidden";
    SELECTED_CARDS[0].querySelector("#static-img").className = "";
    SELECTED_CARDS[0].className = "unactive";

    SELECTED_CARDS[1].querySelector("#gif").className = "hidden";
    SELECTED_CARDS[1].querySelector("#static-img").className = "";
    SELECTED_CARDS[1].className = "unactive";
}

function resetSelectedCardsArray() {
    SELECTED_CARDS = [];
}

/** 
 * Delete all cards permanently and reset the state of global variables
 */
function clearGameCache() {
    document.querySelector("main").innerText = "";
    SELECTED_CARDS = [];
    PLAYER_MOVES = 0;
    TIME = 0;
}

function endGameManager() {
    const thereAreUncoveredCardYet = document.querySelectorAll(".unactive").length > 0;

    if(thereAreUncoveredCardYet) {
        return;
    }

    clearInterval(INTERVAL_ID); // stops the clock

    const message = `Você ganhou em ${PLAYER_MOVES} jogadas ao longo de ${TIME} segundos!`;
    setTimeout(() => { // prevents the alert from being called before the last card being shown
        alert(message);
        let opcao;
        do {
            opcao = prompt("Gostaria de jogar novamente? 's' para sim, 'n' para não").toLowerCase();
        } while(opcao !== "s" && opcao !== "n");

        if(opcao === "s") {
            clearGameCache();
            firstInteractionManager();
        }
    }, 50)
}
