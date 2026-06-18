const cells = document.querySelectorAll(".cells div");

function bindCells() {
  for (let c = 0; c < cells.length; c++) {
    cells[c].addEventListener("click", handleCellClick);
  }
}

function showFiches() {
  for (let c = 0; c < cells.length; c++) {
    cells[c].innerHTML = fiches[c];
  }
}
//klik = vakjes wordern licht
function showPlayfield() {
  for (let rij = 0; rij < 6; rij++) {
    for (let kolom = 0; kolom < 6; kolom++) {

      if (visible[rij][kolom]) {
        let id = rij * 6 + kolom;
        let cell = cells[id];

        cell.classList.add("free");

        let waarde = bombs[rij][kolom];

        if (waarde > 0) {
          cell.innerHTML = waarde;
          cell.style.color = getNumberColor(waarde);
        } else {
          cell.innerHTML = "";
        }
      }
    }
  }
}


//kleur per vakje
function getNumberColor(n) {
  switch (n) {
    case 1: return "blue";
    case 2: return "green";
    case 3: return "red";
    case 4: return "purple";
    default: return "black";
  }
}

//laat de bommen zien
function showBombs() {
  for (let rij = 0; rij < 6; rij++) {
    for (let kolom = 0; kolom < 6; kolom++) {
      if (bombs[rij][kolom] == "B") {
        let id = rij * 6 + kolom;
        cells[id].classList.add("bomb");
        cells[id].innerHTML = "💣";
      }
    }
  }
}
// laat een bericht zien
function showMessage(m) {
  let messageDiv = document.querySelector(".message");
  messageDiv.innerHTML = m;
}

function bindCells() {
  for (let c = 0; c < cells.length; c++) {
    cells[c].addEventListener("click", handleCellClick);

    cells[c].addEventListener("contextmenu", handleRightClick);
  }
}
//vlaggetjes
function handleRightClick(event) {
  event.preventDefault();
  let cell = event.target;

  if (!cell.classList.contains("free")) {
    if (cell.innerHTML === "🚩") {
      cell.innerHTML = "";
    } else {
      cell.innerHTML = "🚩";
      cell.style.color = "black";
    }
  }
}
