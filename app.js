let gameSeq=[];
let userSeq=[];
let btns = ["green","red","yellow","blue"]

let start = false;
let level = 0;
let h2 = document.querySelector("h2");
let highScore = localStorage.getItem("highscore") || 0;



document.addEventListener("keypress",function(){
    if(start == false){
        start = true;
        levelUp();
        console.log("Game started");
    };
});
document.querySelector("#start-btn").addEventListener("click", function() {
    if (start === false) {
        start = true;
        levelUp();
        console.log("Game started");
    }
});


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },150);
};
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
         setTimeout(levelUp,1000);
        }
    } else{
        if(level>highScore){
            highScore = level;
            localStorage.setItem("highScore",highScore);
            document.querySelector("#highscore").innerText = `Highest Score is ${highScore}`;
        }
        h2.innerHTML = `Game Over ! Your score was <b>${level}</b>.Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
            reset();
        }, 200);
       
    };
};

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
};
function btnPress(){
    let btn = this;
    btnFlash (btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
};

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click",btnPress);
};
 
function reset(){
    start = false;
    level = 0;
    userSeq = [];
    gameSeq= [];
};
