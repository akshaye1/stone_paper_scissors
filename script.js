let userScore = localStorage.getItem("userScore") ? parseInt(localStorage.getItem("userScore")) : 0;
let compScore = localStorage.getItem("compScore") ? parseInt(localStorage.getItem("compScore")) : 0;


const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");
const mySCore = document.querySelector("#myScore");
const compSCore = document.querySelector("#compScore");

const resetBtn = document.querySelector("#btn");

resetBtn.addEventListener("click",() => {
    userScore = 0;
    compScore = 0;

    localStorage.removeItem("userScore");
    localStorage.removeItem("compScore");

    mySCore.innerText = 0;
    compSCore.innerText = 0;
})

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

if (userScore > 0 || compScore > 0) {
    mySCore.innerText = userScore;
    compSCore.innerText = compScore;
}

const drawGame = () => {
    msg.innerText = "Game was Draw! Play again.";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin) => {
    if(userWin){
        console.log("You win !");
        msg.innerText = "You win!"
        msg.style.backgroundColor = "green";
        userScore++;
        mySCore.innerText = userScore;

    }else {
        console.log("You lose !");
        msg.innerText = "You lose!"
        msg.style.backgroundColor = "red";
        compScore++;
        compSCore.innerText = compScore;
    }

    // Update local storage after each game
    localStorage.setItem("userScore", userScore);
    localStorage.setItem("compScore", compScore);

}

const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    // Generate computer choice
    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice)

    if(userChoice === compChoice){
        // Game was draw
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true
        } else if(userChoice === "paper"){
            userWin = compChoice === "scissors" ? false : true
        }else{
            userWin = compChoice === "rock" ? false : true
        }

        showWinner(userWin);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})