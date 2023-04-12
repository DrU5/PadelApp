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
      inputCell1.appendChild(input1);
      row.appendChild(inputCell1);

      const separator2 = document.createElement("td");
      separator2.innerText = ":";
      row.appendChild(separator2);

      const inputCell2 = document.createElement("td");
      const input2 = document.createElement("input");
      input2.type = "number";
      inputCell2.appendChild(input2);
      row.appendChild(inputCell2);

      tbody.appendChild(row);
    }

    tbody.getElementsByTagName("tr")[0];
    targetParentElement.appendChild(table);
  }
}

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  const spieleranzahlInput = document.getElementById("spieleranzahl");
  const noRoundsInput = document.getElementById("rundenanzahl");

  const spielerArray = getSpielerArrayOutput();
  console.log(spielerArray);

  generatePairingsTable(
    parseInt(spieleranzahlInput.value),
    parseInt(noRoundsInput.value),
    document.getElementById("tablePairingContainer")
  );

  generatePairings(player, parseInt(noRoundsInput.value));
});

function getSpielerArrayOutput() {
  const spielerArr = [];
  const inputElements = document.getElementsByTagName("input");

  for (let i = 0; i < inputElements.length; i++) {
    const element = inputElements[i];
    if (element.name.includes("name_")) {
      spielerArr.push(element.value);
    }
  }

  return spielerArr;
}

function generatePairings(playerContribution, numberMatches) {
  const row = playerContribution.length / 4;

  for (let test of playerContribution) {
    console.log(test);
  }

  for (let l = 1; l < numberMatches + 1; l++) {
    var table = document.getElementById("Round " + l);
    let shuffled = shuffleArray(playerContribution);

    console.log(shuffled);

    for (let k = 1; k < row + 1; k++) {
      let currentRow = table.rows[k];

      for (let i = 0; i < 4; i++) {
        // Calculate the index in the shuffled array based on row and column
        var index = (k - 1) * 4 + i;

        // Check if index is within the shuffled array length
        if (index < shuffled.length + 1) {
          currentRow.cells[i].innerHTML = shuffled[index];
        }
      }
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var player = ["Bob", "Vette", "Seb", "Uwe", "Klaus", "Henne", "Max", "Ulle"];

/*
Problem: 



*/

/* 


Speicher der alten Funktion

function generatePairings(playerContribution, numberMatches) {
  const row = playerContribution.length / 4;

  for (var l = 1; l < numberMatches + 1; l++) {
    var table = document.getElementById("Round " + l);
    shuffled = shuffleArray(playerContribution);

    console.log(shuffled);

    for (let j = 0; j < playerContribution.length; j++) {
      for (let k = 1; k < row + 1; k++) {
        currentRow = table.rows[k];

        for (let i = 0; i < 5; i++) {
          if (i === 2) {
            i = 3;
          }
          currentRow.cells[i].innerHTML = shuffled[j];
        }
      }
    }
  }
}

*/

/* function generatePairings(playerContribution, numberMatches) {
  const row = playerContribution.length / 4;

  for (var l = 1; l < numberMatches + 1; l++) {
    var table = document.getElementById("Round " + l);
    shuffled = shuffleArray(playerContribution);

    console.log(shuffled);

    for (let k = 1; k < row + 1; k++) {
      currentRow = table.rows[k];

      for (let i = 0; i < 5; i++) {
        // Calculate the index in the shuffled array based on row and column
        var index = (k - 1) * 4 + i;

        // Check if index is within the shuffled array length
        if (index < shuffled.length + 1) {
          if (i === 3) {
            i = 4;
          }
          if (i === 2) {
            i = 3;
          }
          currentRow.cells[i].innerHTML = shuffled[index];
          console.log(i);
        }
      }
    }
  }
}
 */
