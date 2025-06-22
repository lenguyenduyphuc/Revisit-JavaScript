/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const container = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
const gamesToAdd = (games) => {
    // loop over each item in the data
    games.map((game) => {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

        // append the game to the games-container
        container.appendChild(gameCard);
    }) 
}

gamesToAdd(GAMES_JSON)

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);



// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalBackers.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();


const filterUnfundedOnly = () => {
  deleteChildElements(container)

  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal)
  gamesToAdd(unfundedGames)
}

const filterFundedOnly = () => {
  deleteChildElements(container)

  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal)
  gamesToAdd(fundedGames)
}

const showAllGames = () => {
  deleteChildElements(container)
  gamesToAdd(GAMES_JSON)
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly)
fundedBtn.addEventListener('click', filterFundedOnly)
allBtn.addEventListener('click', showAllGames)


const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;



// create a string that explains the number of unfunded games using the ternary operator
const totalMoney = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const unfundedGamesText = unfundedGamesCount === 1 ? 'game' : 'games';


const summaryString = `A total of $${totalMoney.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedGamesCount} ${unfundedGamesText} remain unfunded.`;



// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.textContent = summaryString;

descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [mostFundedGame, secondMostFundedGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

const firstGameElement = document.createElement("p");
firstGameElement.textContent = `Top Game: ${mostFundedGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `Second Game: ${secondMostFundedGame.name}`;
secondGameContainer.appendChild(secondGameElement);