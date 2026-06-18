// elementjes pakken
let quizContainer = document.querySelector("#quiz-container");
let scoreEl = document.querySelector("#score");
let bericht = document.querySelector("#bericht");
let vraagEl = document.querySelector("#vraag");
let buttons = [
  document.querySelector(".antwoord1"),
  document.querySelector(".antwoord2"),
  document.querySelector(".antwoord3"),
  document.querySelector(".antwoord4"),
];
let continueBtn = document.querySelector("#continue");
let fiftyFiftyKnop = document.querySelector("#fiftyFifty");
let backButton = document.querySelector(".back-button");

// variabelen
let score = 0;
let huidigeVraag = 0;
let beantwoord = false;
let fiftyFiftyGebruikt = false;
let fouteAntwoorden = 0;

// vragen array
let vragen = [
  { vraag: "Hoeveel tanden kan een haai wel hebben in zijn leven?", antwoorden: ["500","5000","Meer dan 10.000","1000"], goedIndex: 2 },
  { vraag: "Welk dier slaapt het liefst ondersteboven?", antwoorden: ["Luiaard","Vleermuis","Uil","Aap"], goedIndex: 1 },
  { vraag: "Hoe heet het grootste dier ter wereld?", antwoorden: ["Olifant","Blauwe vinvis","Walrus","Orka"], goedIndex: 1 },
  { vraag: "Wat gebruiken vogels om een nest te bouwen?", antwoorden: ["Steentjes","Gras en takjes","Bladeren","Zand"], goedIndex: 1 },
  { vraag: "Hoe heet het huis van een beer in de winter?", antwoorden: ["Hol","Nest","Burcht","Kuil"], goedIndex: 0 },
  { vraag: "Welke vogel kan niet vliegen?", antwoorden: ["Eend","Struisvogel","Pinguïn","Kip"], goedIndex: 2 },
  { vraag: "Hoe ademt een vis?", antwoorden: ["Met longen","Met kieuwen","Met huid","Met vinnen"], goedIndex: 1 },
  { vraag: "Welke van deze dieren is een reptiel?", antwoorden: ["Slang","Kikker","Pinguïn","Muis"], goedIndex: 0 },
  { vraag: "Wat voor kleur heeft de tong van een giraffe meestal?", antwoorden: ["Rood","Paars","Zwart/blauw","Bruin"], goedIndex: 2 },
  { vraag: "Welk insect maakt honing?", antwoorden: ["Mier","Bij","Vlieg","Wesp"], goedIndex: 1 },
  { vraag: "Hoeveel harten heeft een octopus?", antwoorden: ["1","2","3","4"], goedIndex: 2 },
  { vraag: "Hoe heet een groep wolven bij elkaar?", antwoorden: ["Een kudde","Een groep","Een roedel","Een troep"], goedIndex: 2 },
  { vraag: "Welk dier kan zijn staart loslaten om te ontsnappen?", antwoorden: ["Krokodil","Hagedis","Eekhoorn","Slang"], goedIndex: 1 },
  { vraag: "Wat eten panda's vooral?", antwoorden: ["Rijst","Gras","Bamboe","Vruchten"], goedIndex: 2 },
  { vraag: "Hoeveel tanden heeft een volwassen paard ongeveer?", antwoorden: ["36","40","44","50"], goedIndex: 2 },
  { vraag: "Hoe heet het jong van een kangoeroe?", antwoorden: ["Joey","Cub","Foal","Kitten"], goedIndex: 0 },
  { vraag: "Wat doen mieren om elkaar te volgen?", antwoorden: ["Ze fluiten","Ze laten geursporen achter","Ze trillen","Ze maken geluid"], goedIndex: 1 },
  { vraag: "Welk dier kan kleuren veranderen?", antwoorden: ["Inktvis","Kameleon","Kikker","Vogel"], goedIndex: 1 },
  { vraag: "Hoeveel poten heeft een krab?", antwoorden: ["8","6","10","12"], goedIndex: 2 },
  { vraag: "Hoe noemen we een mannetjeshert?", antwoorden: ["Hert","Bok","Ram","Stier"], goedIndex: 1 }
];

// simpele shuffle
function shuffle(arr) {
  for (let i = arr.length-1; i>0; i--){
    let j = Math.floor(Math.random()* (i+1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// shuffle de vragen
vragen = shuffle(vragen);

// laad vraag
function laadVraag(index){
  beantwoord = false;
  let q = vragen[index];

  // shuffle antwoorden en update goedIndex
  let antw = [...q.antwoorden];
  let goedAnt = antw[q.goedIndex];
  shuffle(antw);
  q.goedIndex = antw.indexOf(goedAnt);

  vraagEl.textContent = q.vraag;
  bericht.textContent = "";
  for(let i=0;i<4;i++){
    buttons[i].textContent = antw[i];
    buttons[i].style.backgroundColor="";
    buttons[i].style.display="inline-block";
  }
  fiftyFiftyKnop.disabled = fiftyFiftyGebruikt;
}

// verwerk antwoord
function verwerkAntwoord(i){
  if(beantwoord) return;

  if(i===vragen[huidigeVraag].goedIndex){
    score += 10;
    buttons[i].style.backgroundColor="lightgreen";
    bericht.textContent="Goed!";
  } else {
    score = Math.max(0,score-5);
    fouteAntwoorden++;
    buttons[i].style.backgroundColor="lightcoral";
    bericht.textContent="Fout!";
  }

  scoreEl.textContent = "Score: "+score;
  beantwoord = true;
}

// volgende vraag
function volgendeVraag(){
  if(!beantwoord){alert("Eerst antwoorden!"); return;}
  huidigeVraag++;
  if(huidigeVraag>=vragen.length){
    toonEindScherm();
    return;
  }
  laadVraag(huidigeVraag);
}

// fifty-fifty functie
function gebruikFiftyFifty(){
  if(fiftyFiftyGebruikt) return;

  fiftyFiftyGebruikt = true;
  fiftyFiftyKnop.disabled = true;

  let goed = vragen[huidigeVraag].goedIndex;
  let verbergen = 0;
  for(let i=0;i<4;i++){
    if(i!==goed && verbergen<2){
      buttons[i].style.display="none";
      verbergen++;
    }
  }
}

// toon eindscherm
function toonEindScherm() {
    const maxPunten = vragen.length * 10;
    const percentage = (score / maxPunten * 100).toFixed(1);
    const vragenGoed = Math.round(score / 10);
    
    document.body.innerHTML = `
        <div class="eind-quiz-box">
            <h1>Dieren Quiz</h1>
            <p>Quiz afgerond!</p>
            <div class="score">Score: ${score} punten</div>
            <div class="score">Vragen goed: ${vragenGoed} / ${vragen.length}</div>
            <div class="score">Foute antwoorden: ${fouteAntwoorden}</div>
            <p class="avg">Cijfer: ${percentage}%</p>
            <div class="eind-knoppen">
                <button class="button" onclick="startQuizOpnieuw()">Opnieuw spelen</button>
                <button class="button" onclick="window.location.href='../index.html'">Terug naar home</button>
            </div>
            
            <div class="footer">
                <div class="copyright">© Coders</div>
                <div>Dieren Quiz</div>
            </div>
        </div>
    `;
}

// start quiz opnieuw
function startQuizOpnieuw() {
    location.reload();
}

// reset quiz
function resetQuiz(){
  score=0;
  huidigeVraag=0;
  beantwoord=false;
  fiftyFiftyGebruikt=false;
  fouteAntwoorden=0;
  fiftyFiftyKnop.disabled=false;
  scoreEl.textContent="Score: "+score;
  bericht.textContent="";
  vragen = shuffle(vragen);
  laadVraag(huidigeVraag);
}

// events
buttons.forEach((b,i)=>b.addEventListener("click",()=>verwerkAntwoord(i)));
continueBtn.addEventListener("click",volgendeVraag);
fiftyFiftyKnop.addEventListener("click",gebruikFiftyFifty);
backButton.addEventListener("click",resetQuiz);

// start quiz
laadVraag(huidigeVraag);

function userName() {
  let naamInvoer = "";

  // Blijf vragen totdat de gebruiker iets invult
  while (!naamInvoer) {
    naamInvoer = prompt("Wat is uw naam?");
  }

  const naamElement = document.querySelector("#naamGebruiker");
  naamElement.textContent = " " + naamInvoer + "";
}

// Voer de functie uit zodra de pagina geladen is
window.addEventListener("load", userName);