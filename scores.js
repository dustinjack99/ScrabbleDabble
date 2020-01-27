let list = JSON.parse(localStorage.getItem("highscores"));
let scoreBoard = document.querySelector("#scoreboard");
console.log(list);
list.sort(function (a, b) {
  return b.score - a.score;
});

for (i = 0; i < list.length; i++) {
  let li = document.createElement("li");
  scoreBoard.appendChild(li);
  li.textContent = list[i].user + "'s score:   " + list[i].score;
}

