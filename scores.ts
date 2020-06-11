// DOM Elements
const scoreBoard = document.querySelector<HTMLOListElement>('#scoreboard');

// Score Variables
let scoreDiv;
let li;
let deleteBtn;
let list = JSON.parse(localStorage.getItem('highscores'));

interface HighScores {
  [score: string]: number;
}
// function to sort scores
list.sort(function (a: HighScores, b: HighScores) {
  return b.score - a.score;
});

// Append scores to page
for (let i = 0; i < list.length; i++) {
  scoreDiv = document.createElement('div');
  scoreBoard.appendChild(scoreDiv);
  li = document.createElement('li');
  li.textContent = `${list[i].user}'s score: ${list[i].score}`;
  li.setAttribute('id', list[i].id);
  scoreDiv.appendChild(li);
  deleteBtn = document.createElement('i');
  deleteBtn.className = 'fas fa-times';
  scoreDiv.appendChild(deleteBtn);
}

// Remove scores from page
// scoreBoard.addEventListener('click', function(e) {
//   if (e.target.nodeName === 'I') {
//     let deleteIcon = e.target;
//     let scoreLi = deleteIcon.previousSibling;
//     let scoreID = scoreLi.getAttribute("id");
//     for (let i = 0; i < list.length; i++) {
//       if (list[i].id === scoreID) {
//         list.splice(i, 1);
//       }
//     }
//     scoreLi.parentElement.remove();
//     localStorage.setItem("highscores", JSON.stringify(list));
//   }
// })
