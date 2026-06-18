"use strict";

function gameOver() {
  setTimeout(() => window.location.reload(), 2500);

}

function handleCellClick(event) {
  console.log(event.target.id);
  if(isCellisBomb(event.target.id)){
    console.log('Je staat op een bom')
    showMessage('Je hebt verloren!!!');
    showBombs();
    gameOver(); 
  } else {
    setFreeSpace(event.target.id);
    console.log(bombs)
    console.log(visible);
  }
  if(isWinner()){
    showMessage('Je hebt gewonnen!!!')
  }
  showPlayfield();
}

