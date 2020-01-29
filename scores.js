const scoreBoard = document.querySelector("#scoreboard");
let scoreDiv;
let li;
let deleteBtn;
let list = JSON.parse(localStorage.getItem("highscores"));

list.sort(function (a, b) {
  return b.score - a.score;
});

for (i = 0; i < list.length; i++) {
  scoreDiv = document.createElement("div");
  scoreBoard.appendChild(scoreDiv);
  li = document.createElement("li");
  li.textContent = `${list[i].user}'s score: ${list[i].score}`;
  scoreDiv.appendChild(li);
  deleteBtn = document.createElement("i");
  deleteBtn.className = 'fas fa-times';
  scoreDiv.appendChild(deleteBtn);
}

// event listener on delete icon to call delete function
scoreBoard.addEventListener('click', function(e) {
  if (e.target.nodeName === 'I') {
    let deleteIcon = e.target;
    let scoreLi = deleteIcon.previousSibling;
    console.log(scoreLi.textContent);
    console.log(list);
  }
})
