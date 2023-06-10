let players = [];

function getPlayerIndex(name) {
  let index = players.findIndex((obj) => obj.name === name);
  return index;
}

//Function that creates the table with all player
function generateTable(playercount, targetParentElement) {
  const spieleranzahl = playercount;

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  table.id = "Spieler";

  const headerRow = document.createElement("tr");

  const headerSpieler = document.createElement("th");
  headerSpieler.innerText = "Spieler";
  headerRow.appendChild(headerSpieler);

  const headerName = document.createElement("th");
  headerName.innerText = "Name";
  headerRow.appendChild(headerName);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  for (let i = 1; i <= spieleranzahl; i++) {
    const tr = document.createElement("tr");

    const tdSpieler = document.createElement("td");
    tdSpieler.innerText = "Spieler " + i;
    tr.appendChild(tdSpieler);

    const tdName = document.createElement("td");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.name = "name_" + i;
    tdName.appendChild(inputName);
    tr.appendChild(tdName);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  const tableContainer = targetParentElement;
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

//Action pressing button "Tabelle erstellen"
const createTableBtn = document.getElementById("createTableBtn");
createTableBtn.addEventListener("click", () => {
  const spieleranzahlInput = document.getElementById("spieleranzahl");
  if (parseInt(spieleranzahlInput.value) % 4 !== 0) {
    alert("Die Anzahl der Spieler muss durch 4 teilbar sein.");
    return;
  }

  generateTable(
    parseInt(spieleranzahlInput.value),
    document.getElementById("tableContainer")
  );
});

//Function that creates the Pairings-Table
function generatePairingsTable(matches, numTimes) {
  const matchesNumber = matches / 4;

  for (let j = 0; j < numTimes; j++) {
    const table = document.createElement("table");
    table.classList.add("pairings-table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.id = `Round ${j + 1}`;

    const headerRow = document.createElement("tr");

    const headerSpieler1 = document.createElement("th");
    headerSpieler1.innerText = "Spieler 1";
    headerRow.appendChild(headerSpieler1);

    const headerSpieler2 = document.createElement("th");
    headerSpieler2.innerText = "Spieler 2";
    headerRow.appendChild(headerSpieler2);

    const headerDP1 = document.createElement("th");
    headerDP1.innerText = ":";
    headerRow.appendChild(headerDP1);

    const headerSpieler3 = document.createElement("th");
    headerSpieler3.innerText = "Spieler 3";
    headerRow.appendChild(headerSpieler3);

    const headerSpieler4 = document.createElement("th");
    headerSpieler4.innerText = "Spieler 4";
    headerRow.appendChild(headerSpieler4);

    const headerPunkte1 = document.createElement("th");
    headerPunkte1.innerText = "Team 1";
    headerRow.appendChild(headerPunkte1);

    const headerDP2 = document.createElement("th");
    headerDP2.innerText = ":";
    headerRow.appendChild(headerDP2);

    const headerPunkte2 = document.createElement("th");
    headerPunkte2.innerText = "Team 2";
    headerRow.appendChild(headerPunkte2);

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);

    const targetParentElement = document.getElementById(
      "tablePairingContainer"
    );

    if (j === 0) {
      targetParentElement.innerHTML = "";
    }

    for (let i = 0; i < matchesNumber; i++) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      const cell5 = document.createElement("td");
      const cell6 = document.createElement("td");
      const cell7 = document.createElement("td");
      const cell8 = document.createElement("td");

      row.appendChild(cell1);
      row.appendChild(cell2);

      const separator1 = document.createElement("td");
      separator1.innerText = ":";
      row.appendChild(separator1);

      row.appendChild(cell4);
      row.appendChild(cell5);

      const inputCell1 = document.createElement("td");
      const input1 = document.createElement("input");
      input1.type = "number";
      input1.min = "0";
      inputCell1.appendChild(input1);
      row.appendChild(inputCell1);

      const separator2 = document.createElement("td");
      separator2.innerText = ":";
      row.appendChild(separator2);

      const inputCell2 = document.createElement("td");
      const input2 = document.createElement("input");
      input2.type = "number";
      input2.min = "0";
      inputCell2.appendChild(input2);
      row.appendChild(inputCell2);

      tbody.appendChild(row);
    }

    tbody.getElementsByTagName("tr")[0];
    targetParentElement.appendChild(table);
  }
}

//Action when button "Starten" is clicked
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  const spieleranzahlInput = document.getElementById("spieleranzahl");
  const noRoundsInput = document.getElementById("rundenanzahl");

  getSpielerArrayOutput();

  if (parseInt(spieleranzahlInput.value) <= parseInt(noRoundsInput.value)) {
    alert(
      "Es können nicht ausreichend unterschiedliche Partien generiert werden"
    );
    return;
  }

  generatePairingsTable(
    parseInt(spieleranzahlInput.value),
    parseInt(noRoundsInput.value),
    document.getElementById("tablePairingContainer")
  );

  generatePairings(parseInt(noRoundsInput.value));

  createStandings(parseInt(spieleranzahlInput.value));
});

//Action when button "Tabelle berechnen" is clicked
let calculateTableBtn = document.getElementById("calculateTableBtn");
calculateTableBtn.addEventListener("click", () => {
  updateStandings(calcPlayerPoints());

  console.log("STANDINGS: ", players);
});

//Function that calculates the points of each player and gives back in right order
function calcPlayerPoints() {
  let noRoundsInput = document.getElementById("rundenanzahl");

  for (let i = 0; i < players.length; i++) {
    let playername = players[i].name;
    getPlayerPoints(playername, parseInt(noRoundsInput.value));
  }

  let standings = players;
  standings.sort((a, b) => b.points - a.points);
  return standings;
}

//Function that updates the standings-table
function updateStandings(standings) {
  const table = document.getElementById("standings");
  let currentRank = 1;
  let previousPoints = null;

  for (let i = 0; i < standings.length; i++) {
    let row = table.rows[i + 1]; // i+1 to skip the header row

    // Assuming the second cell (index 1) contains the team name
    let teamCell = row.cells[1];
    teamCell.textContent = standings[i].name;

    // Assuming the third cell (index 2) contains the points
    let pointsCell = row.cells[2];
    let points = standings[i].points;
    pointsCell.textContent = points;

    if (points === previousPoints) {
      // If the points are the same as the previous team, assign the same rank
      let rankCell = row.cells[0];
      rankCell.textContent = currentRank;
    } else {
      // If the points are different from the previous team, update the rank
      let rankCell = row.cells[0];
      rankCell.textContent = i + 1;
      currentRank = i + 1;
    }

    previousPoints = points;
  }
}

//Function that gets the names of all players
function getSpielerArrayOutput() {
  //const spielerArr = [];
  const inputElements = document.getElementsByTagName("input");

  for (let i = 0; i < inputElements.length; i++) {
    const element = inputElements[i];
    if (element.name.includes("name_")) {
      let player = { name: element.value };
      players.push(player);
      //spielerArr.push(element.value);
    }
  }
}

//Function that creates the pairings in the table
function generatePairings(numberMatches) {
  const row = players.length / 4;

  for (let l = 1; l < numberMatches + 1; l++) {
    var table = document.getElementById("Round " + l);
    let shuffled = players.map((obj) => obj.name);
    shuffled = shuffleArray(shuffled);

    for (let k = 1; k < row + 1; k++) {
      let currentRow = table.rows[k];
      let index = 0;

      for (let i = 0; i < 5; i++) {
        if (i < 2) {
          index = (k - 1) * 4 + i;
          if (index < shuffled.length + 1) {
            currentRow.cells[i].innerHTML = shuffled[index];
          }
        } else if (i > 2) {
          index = (k - 1) * 4 + i - 1;
          if (index < shuffled.length + 1) {
            currentRow.cells[i].innerHTML = shuffled[index];
          }
        }
      }
    }
  }
}
//Function that shuffles the given array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Function that creates the table "Standings"
function createStandings(numberPlayers) {
  // Select the tableStandingsContainer div element
  let tableStandingsContainer = document.getElementById(
    "tableStandingsContainer"
  );

  // Clear the content of the tableStandingsContainer div
  tableStandingsContainer.innerHTML = "";

  // Create a table element
  let table = document.createElement("table");
  table.setAttribute("id", "standings");

  // Create table header row
  let headerRow = table.insertRow();
  let platzHeader = document.createElement("th");
  platzHeader.textContent = "Platz";
  headerRow.appendChild(platzHeader);
  let spielerHeader = document.createElement("th");
  spielerHeader.textContent = "Spieler";
  headerRow.appendChild(spielerHeader);
  let punkteHeader = document.createElement("th");
  punkteHeader.textContent = "Punkte";
  headerRow.appendChild(punkteHeader);

  // Create table rows for each player
  for (let i = 1; i <= numberPlayers; i++) {
    let row = table.insertRow();
    let platzCell = row.insertCell();
    platzCell.textContent = i;
    let spielerCell = row.insertCell();
    spielerCell.textContent = "Spieler " + i;
    let punkteCell = row.insertCell();
    punkteCell.textContent = "0"; // Set initial points to 0
    players[i - 1].points = 0;
  }

  // Append the table to the tableStandingsContainer div
  tableStandingsContainer.appendChild(table);
}

//Function that gives the points from the table
function getPlayerPoints(searchString, numTimes1) {
  let value = 0;
  for (let k = 0; k < numTimes1; k++) {
    let tableId = `Round ${k + 1}`;
    let table = document.getElementById(tableId);

    // Loop through each row of the table
    for (let i = 0; i < table.rows.length; i++) {
      let row = table.rows[i];

      // Loop through each cell in the row
      for (let j = 0; j < row.cells.length; j++) {
        let cell = row.cells[j];

        // Check if the cell contains the search string
        if (cell.textContent === searchString) {
          if (j === 0 || j === 1) {
            let cellOne =
              table.rows[i].cells[5].querySelector("input[type=number]");
            try {
              value = value + parseInt(cellOne.value);
            } catch {}
          } else {
            let cellOne =
              table.rows[i].cells[7].querySelector("input[type=number]");
            try {
              value = value + parseInt(cellOne.value);
            } catch {}
          }
        }
      }
    }
  }
  let indexPlayer = getPlayerIndex(searchString);
  players[indexPlayer].points = value;
}
