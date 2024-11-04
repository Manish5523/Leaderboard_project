let btn = document.querySelector("#addButton");
let body = document.querySelector("body");
let cntry = document.querySelector("#Country");
let score = document.querySelector("#score");
var fname = document.querySelector("#fname");
var lname = document.querySelector("#lname");
var leaderBoard = document.querySelector(".leader-box");
var scoreArr = [];
var control = document.querySelector(".control");



window.addEventListener("load",()=>{
    setTimeout(() => {
        body.style.filter = "blur(0px)"
    }, Math.floor(Math.random()*1000)+3000);

})

btn.addEventListener("click", () => {
    if(fname.value == "" || lname.value == "" || score.value == "" || cntry.value == ""){
        alert("Please Fill All The Fields");
    }
    else{
        var Candidate = {
            FName: fname.value,
            Lname: lname.value,
            Country: cntry.value,
            Score: +score.value
        };
        scoreArr.push(Candidate);
        scoreArr.sort((a, b) => b.Score - a.Score);
        displayOnUi();
        fname.value = "";
        lname.value = "";
        cntry.value = "";
        score.value = "";
    }
});

function displayOnUi() {
    leaderBoard.innerHTML = "";
    scoreArr.forEach(function(e, idx) {
        let div = document.createElement("div");
        div.className = "Leader-card";
        let str = `
        <div class="entry fn">
            <p>First Name:</p>
            <h4>${e.FName}</h4>
        </div>
        <div class="entry ln">
            <p>Last Name:</p>
            <h4>${e.Lname}</h4>    
        </div>
        <div class="entry ctry">
            <p>Country:</p>
            <h4>${e.Country}</h4>
        </div>
        <div class="entry sc">
            <p>Score:</p>
            <h4 class="p-score">${e.Score}</h4>
        </div>
        <div class="control">
            <img src="./Assets/delete-icon.png" alt="">
            <button>-5</button>
            <button>+5</button>
        </div>
        `;
        div.innerHTML = str;
        leaderBoard.appendChild(div);

        let controls = div.querySelectorAll(".control");
        controls.forEach(em => {
            var dltBtn = div.querySelector(".control img");

            em.addEventListener("click", (cl) => {
                if (cl.target.textContent == "+5") {
                    e.Score += 5;
                    scoreArr.sort((a, b) => b.Score - a.Score);
                    displayOnUi();
                }else if(cl.target.textContent == "-5") {
                    if (e.Score >= 5) e.Score -= 5;
                    scoreArr.sort((a, b) => b.Score - a.Score);
                    displayOnUi();
                }else{
                    scoreArr.splice(idx, 1);
                    displayOnUi();
                }
            });
        });
    });
}