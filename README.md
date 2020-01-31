# Scrabble Dabble
1st UW Full-Stack Coding Boot Camp group project

## The Assignment
For our first project we were to work in groups of four to build an application, deploy it to Github Pages and then present it to the class. The application requirements were as follows:
* Use two server-side APIs
* Use a CSS framework (other than Bootstrap)
* Use at least one new third-party API
* Have a polished UI
* Meet quality code standards
* Not use alerts, prompts or confirms
* Deploy to Github Pages

## The Team
Our team members were:
* Dustin Jackson, https://github.com/dustinjack99 (owner of Github repository)
* Jon Lee, https://github.com/enadan
* Eric Bossler, https://github.com/E-Bossler
* Austen Turner, https://github.com/austenpturner

## The Process
Our first order of business was deciding what to build. We agreed we wanted to build a game, so the next was coming up with an idea that would meet the requirements of the assignment while remaining inside the scope of our time and resources. After much deliberation we decided on a word scramble game and soon the construction of ScrabbleDabble was underway. We utilized the Github Projects kanban tool to keep track of tasks and split up the work. 

The next step was finding two APIs and a CSS framework to use. Because we were making a word game, it made sense for one of the APIs to be a dictionary API so we could check spelling. For the second we decided to have a little fun and incorporate a gif API to make the game more entertaining for the user. Later, we discovered the gif API also added an element of distraction. It made the timed game more challenging and tested the user's concentration. Since the layout and design of our application was straightforward, we wanted to use a simpler CSS framework. We decided to use Pure CSS and used it for our buttons, inputs, and tables. 

After selecting our APIs and framework we started working on the rules for game play, necessary HTML elements, page layout and JavaScript pseudo code. Initially the HTML consisted of a header, div to hold time and score, form with an input field and submit button, and a word bank table. Later, we added a container to hold a gif, a button to render all new tiles, as well as a landing page and a high scores page. We designed our application using a mobile-first responsive layout. On smaller screens the elements are laid out vertically while on larger screens some elements adjust to display horizontally. Once we had most of our pseudo code written out, we started in on adding behavior to our page and building a working game.

Writing the JavaScript, we utilized a lot of the skills and knowledge we had gained from previous class assignments. For example we used fetch calls to return API objects, JS methods to access information inside the response objects and manipulate array content, event listeners to call functions when the user clicks on button elements, methods to make new HTML elements and append them to the page, as well as methods to set and get local storage values. While a lot of the functionality we used was familiar to us there were still quite a few challenging aspects. We had difficulty when it came to comparing user inputted letters to the displayed tiles, writing the functionality to replace consumed tiles, and utilizing local storage. However, we were able to work together to overcome the challenges and successfully build a functioning game. After some finishing touches to polish up the UI and make it pretty we were ready to present Scrabble Dabble to our class.

## The Outcome
Our final application is a functional word scramble game that allows a user to save their high scores. The landing page displays instructions and has a button to take the user to the game page. When the user first load the game page they will see seven random tiles and their associated values on the screen. The timer starts and the user has three minutes to type and submit as many words as they can using the tiles currently on the screen. When a word is submitted the application determines if all the letters in the word match the current letter tiles and if it is an actual word. If it passes the test, the word is added to the word bank, tiles used are removed from the tile bag and the tile count decreases. The amount of points earned for a word is based on the tile values and word length. If a word is longer than three letters, the user can earn bonus points based on the number of letters in the word. The longer the word the more points earned. Points are added up and updated after each word submitted. When the user submits a correct word, a gif is also generated. The contents of the gif is based on the word entered. A new gif will appear on the screen for each correct word, creating an element of entertainment but also distraction. 

If the player cannot make a word from the letter tiles on the screen, they also have the option to dump the tiles. When the user clicks the "dump tiles" button the letters will be put back into the tile bag and new letters will be generated. While in some instances when there are no vowel tiles this may be necessary, we also wanted to discourage the user from regenerating tiles when they cannot find a word glance. Therefore, when the user the dumps their tiles two points will be deducted.

If game time runs out or the played uses all the tile letters (which is very difficult to do!) the game is over. The display is wiped clean and an input for the user's name and a submit button is displayed. The user can enter their name to log their score to the high scores page. When the user clicks the submit button, they are taken to the high scores page. Here the logged scores are listed in order from highest to lowest. The user has the option to erase scores by clicking the "X" button to their right. There is also a "Play Again" button that will take the user back to the landing page.

Scrabble Dabble landing page:

![Scrabble-Dabble-landing-page](https://github.com/dustinjack99/ScrabbleDabble/blob/master/assets/images/landing-page.jpg)

Scrabble Dabble game play on mobile screen:

![Scrabble-Dabble-mobile-screen](https://github.com/dustinjack99/ScrabbleDabble/blob/master/assets/images/game-play-mobile.jpg)

Scrabble Dabble game play on a large screen:

![Scrabble-Dabble-large-screen](https://github.com/dustinjack99/ScrabbleDabble/blob/master/assets/images/game-play-lg-screen.jpg)

Scrabble Dabble game-over screen:

![Scrabble-Dabble-game-over](https://github.com/dustinjack99/ScrabbleDabble/blob/master/assets/images/end-of-game-screen.jpg)

Scrabble Dabble high scores page:

![Scrabble-Dabble-high-scores](https://github.com/dustinjack99/ScrabbleDabble/blob/master/assets/images/high-scores-page.jpg)

## Next Steps
There are a few ways we would like to improve our game. First, we would like to make mobile device game play more user-friendly by adding a feature that enters a tile's letter into the input when a user clicks on it. So instead of a user needing to use their keyboard and type out a word they can just tap on the tiles. 
Second, we would like to add more animation to the page. I would be fun if the user could drag around the tiles, or if there was an animated tile bag that dumped the tiles out onto the page. We could also add some smoother transitions to the current elements being appended to the page.
Last, it may be helpful to add a button that gives the user the option to change the order of the displayed tiles. Something like a "re-scramble" button. This may help the user to see a word option they couldn't see before. 

### Thanks for reading! 
