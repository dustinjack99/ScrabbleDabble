var previousHighScores = JSON.parse(localStorage.getItem('previousHighScores'));
if (previousHighScores == null) previousHighScores = [];
previousHighScores.push(scoreToLog);
localStorage.setItem("previousHighScores", JSON.stringify(previousHighScores));