"use strict";
let bombs = [ 
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
];



let visible = Array.from({ length: 6 }, () =>
  Array(6).fill(false)
);

// aantal bommen op het veld
function setBombs() {
for( let i=0;i<6;i++) {
 let kolom=getRandomInt(6);
 let rij=getRandomInt(6);
 if(bombs[rij][kolom]=="B"){
  i--;
 }
 bombs[rij][kolom]="B";
} 
 
console.log(bombs);
  
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//is een vakje een bom
function isCellisBomb(id){
let rij=getRow(id);
let kolom=getColumn(id);
console.log(rij);
console.log(kolom);
  if(bombs[rij][kolom]=="B")
    return true;
  else {
    return false;
  }
}
//vake is geen bom 
function setFreeSpace(id) {
  let rij = getRow(id);
  let kolom = getColumn(id);
  visible[rij][kolom] = true;
}


function getRow(id) {
  return Math.floor(id/6  );
}

function getColumn(id){
  return id%6;
}
//winnen
function isWinner() {
  for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
          if((visible[r][c]===false && bombs[r][c]=='B')){

          } else
            if ((visible[r][c]===false)) {
              return false;
            }
          }
        }
  return true;
}
//hoeveel bommen
function calculateBombs() {
for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
            if (bombs[r][c] === 'B') continue;
            bombs[r][c] = countAdjacentBombs(bombs, r, c, 6, 6);
        }
    }
  }
//nummers in vakjes
function countAdjacentBombs(board, r, c, rows, cols) {
    let count = 0;
    // Check all 8 directions
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let newR = r + i;
            let newC = c + j;
            if (newR >= 0 && newR < rows && newC >= 0 && newC < cols) {
                if (board[newR][newC] === 'B') count++;
            }
        }
    }
    return count;
}