alert("Use Laptop for better experience");

//PRELOADING ALL THE BACKGROUND IMAGES
const preloadImages = [
    'redturn.png',
    'greenturn.png',
    'redwin.png',
    'greenwin.png',
];
function preload() {
    for (let imageSrc of preloadImages) {
        const img = new Image();
        img.src = imageSrc;
    }
}
window.addEventListener('load', preload);

//CALLING THE ELEMENTS FROM HTML
let boxes = document.querySelectorAll(".box");
let xScoreElement = document.getElementById("x-score"); 
let oScoreElement = document.getElementById("o-score"); 
let reset = document.querySelector("#reset");
let resetScoresButton = document.getElementById("resetScores");
const gameSound = document.getElementById("gameSound");

//DEFINING SOME VARIABLES
let xScore = 0;
let oScore = 0;
let turn0 = true;
let count = 0;

//WINNING PATTERN
const winPattern = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7],
    [2,5,8], [2,4,6], [3,4,5], [6,7,8],
];

//DISABLING OR ENABLING BOXES
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

//FUNCTION FOR PLAYING THE GAME
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            document.body.style.backgroundImage = "url('redturn.png')"; 
            box.style.color = "green"
            gameSound.play();
            box.innerText = "O";
            turn0 = false;
            count=count+1;    
        } else {
            document.body.style.backgroundImage = "url('greenturn.png')"; 
            box.style.color = "red"
            gameSound.play();
            box.innerText = "X";
            turn0 = true;
            count=count+1;
        }
        box.disabled = true;
        checkWinner();
    });
});

//FUNCTION TO CHECK WINNER
const checkWinner = () => {
    for (let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                updateScore(pos1val);
                return;
            }
        }
    }
    count++; // Increment count only if no winner is found
    // if(count==9){
        // alert(`Draw`);
        // resetGame();
        // msg.innerText = `Draw`;
        // msgContainer.classList.remove("hide");
        // disableBoxes();
    // }
};

//FUNCTION TO CHECK WINNER
const showWinner = (winner) => {
    disableBoxes();
    if (winner === 'X') {
        document.body.style.backgroundImage = "url('redwin.png')";
    } else if (winner === 'O') {
        document.body.style.backgroundImage = "url('greenwin.png')";
    }
}

//FUNCTION TO UPDATE SCORES
const updateScore = (winner) => {
    if (winner === "X") {
        xScore++;
        xScoreElement.innerText = xScore;
    } else if (winner === "O") {
        oScore++;
        oScoreElement.innerText = oScore;
    }
};

//FUNCTION FOR RESET OR NEW GAME
const resetGame = () => {
    turn0 = true;
    document.body.style.backgroundImage = "url('greenturn.png')"; 
    enableBoxes();
    msgContainer.classList.add("hide");
}

//RESETTING SCORES
resetScoresButton.addEventListener("click", () => {
    xScore = 0;
    oScore = 0;
    xScoreElement.innerText = xScore;
    oScoreElement.innerText = oScore;
    resetGame();
});

reset.addEventListener("click", resetGame);