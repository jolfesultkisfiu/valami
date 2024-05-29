
let c = document.getElementById("ex");
let ctx = c.getContext("2d");

    // eger esemeny figyelese a vasznon
c.addEventListener('mousemove', soibicsMouseMove, false);
c.addEventListener('click',sobicsMouseClick,false);

const colors=["red","brown","blue","yellow","green","purple"];
let points=0;
let sobicsImg;

let audio=new Audio('ZQU5X5/music.mp3');
let successAudio=new Audio('ZQU5X5/success.mp3');
let isPlaying=false;
class Cube{
    constructor(color,filename,X,Y) {
        this.color=color;
        this.filename=filename;
        this.X=X;
        this.Y=Y;
    }
}
    // a kukac konstans y koordinataja
var sobicsY = 500;
    // a kukac kezdo x koordinataja
var sobicsX = 300;
let requestID;
var sobicsHand=null;

let sobicsColumn=0;
let teglak=[];
    // kukacos kep peldanyositasa
sobicsImg = new Image();
    sobicsImg.src = "ZQU5X5/sobics.jpg";
    function updatePoints(){
    document.getElementById("pontszam").textContent=points;
}
    sobicsImg.onload = function() {
    initCubes();
    startAnimation();
    renderPlayersTable();
};

    function renderPlayersTable() {
    const players = getAllPlayers();
    const tableBody = document.getElementById('playersTableBody');

    // Táblázat tartalmának törlése
    tableBody.innerHTML = '';

    // Játékosok adatainak hozzáadása a táblázathoz
    players.forEach(player => {
    const row = `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.score}</td>
                </tr>
            `;

    tableBody.innerHTML += row;
});
}

    // animacio keszitesehez
    var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;


    document.addEventListener('DOMContentLoaded',function (){
    const timeBar=document.querySelector('.time-bar');
    let progress=0;
    const totalTime=60000;

    function updateProgressBar(){

    progress+=10;
    const percentage=(progress/totalTime)*100;
    timeBar.style.width=`${percentage}%`;

    if(progress>=totalTime){
    gameOver();
    clearInterval(interval);
}
}
    const interval=setInterval(updateProgressBar,10);
})



    function toggleAudio(){
    if(isPlaying){
    audio.pause();
}else{
    audio.play();
}
    isPlaying=!isPlaying;
}
    function gameOver(){
    cancelAnimationFrame(requestID);
    c.removeEventListener('mousemove', soibicsMouseMove, false);
    c.removeEventListener('click',sobicsMouseClick,false);
    document.getElementById('playerNameForm').style.display='block';
    document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Az alapértelmezett esemény megakadályozása

    const playerName = document.getElementById('playerName').value;
    // Példában rögzített pontszám, mivel a játék vége után nincs konkrét pontszám
    // Játékos nevének és pontszámának mentése
    localStorage.setItem(playerName, points.toString());

    // Táblázat frissítése
    renderPlayersTable();

    // Form elrejtése
    document.getElementById('playerNameForm').style.display = 'none';
});
}
    function startAnimation(){
    requestID=requestAnimationFrame(animate);
}
    function sobicsMouseClick(e) {
    //ha üres a keze
    if(sobicsHand===null){
    let theOne;
    //ahol áll sobics abból az oszlopból felveszi a legközelebbit
    for(let i=sobicsColumn;i<teglak.length;i+=10){
    if(teglak[i] !== null && teglak[i] !==  undefined){
    theOne=teglak[i];
}
}
    if(theOne!==undefined &&  theOne !== null ){
    sobicsHand=theOne;
    removeCube(theOne);
}

}else{
    let i;
    for(i=sobicsColumn;i<teglak.length;i+=10){
}
    i-=10;
    if(teglak[i]===null){
    for(i;teglak[i]===null;i-=10){

}
    teglak[i+=10]=sobicsHand;
    const visited=Array(teglak.length).fill(false);
    let mustRemove=[];
    let sum=checkScore(i,teglak[i].color,visited,0,mustRemove);
    if(sum>=4){
    for (let mustRemoveElement of mustRemove) {
    removeCube(mustRemoveElement);
}
    points+=sum*1000;
    successAudio.play();
    updatePoints();
}


    sobicsHand=null;
}else if(teglak[i]!==undefined){

    i+=10;
    teglak[i]=sobicsHand;
    const visited=Array(teglak.length).fill(false);
    let mustRemove=[];
    let sum=checkScore(i,teglak[i].color,visited,0,mustRemove);

    if(sum>=4){
    for (let mustRemoveElement of mustRemove) {
    removeCube(mustRemoveElement);
}
    points+=sum*1000;
    successAudio.play();
    updatePoints();

}

    sobicsHand=null;
}
    addNewRow();
    checkGameOver();


}
    console.log("Hívás előtt ");
    console.log(teglak)


    console.log("Hívás után ");
    console.log(teglak)
}
    function getAllPlayers(){
    const players = [];
    const length = localStorage.length;

    for (let i = 0; i < length; i++) {
    const playerName = localStorage.key(i); // Játékos nevének lekérése
    const playerScore = parseInt(localStorage.getItem(playerName), 10); // Pontszám lekérése

    // Objektum létrehozása a játékos nevével és pontszámával
    const player = {
    name: playerName,
    score: playerScore
};

    players.push(player); // Játékos hozzáadása a tömbhöz
}
    return players;
}
    function checkGameOver(){
    for(let i=130;i<140;i++){
    if(teglak[i]!==null && teglak[i]!==undefined){
    gameOver();
}
}
}
    function checkScore(index,color,visited,count,removeArray){
    const neighbors = [
    -10,  // Fent
    10,   // Lent
    -1,      // Balra
    1        // Jobbra
    ];

    for (let offset of neighbors) {
    const neighborIndex = index + offset;
    let show;
    if(offset===-1 || offset===1){
    show=Math.floor(neighborIndex/10)===Math.floor(index/10)&&neighborIndex >= 0 && neighborIndex < teglak.length;
}else{
    show=neighborIndex >= 0 && neighborIndex < teglak.length;
}
    if ( show && teglak[neighborIndex]!==null && teglak[neighborIndex]!==undefined  && !visited[neighborIndex]) {
    // A szomszédos elem színe
    const neighborColor = teglak[neighborIndex].color;

    // Ha a színek megegyeznek
    if (neighborColor === color) {
    visited[neighborIndex] = true;
    count++;  // Növeljük a darabszámot
    removeArray.push(teglak[neighborIndex]);
    count = checkScore(neighborIndex, color, visited, count,removeArray);  // Rekurzív hívás a szomszédos elemre
}
}
}
    return count;
}



    function initCubes(){
    let x=0;
    let y=0;
    for(let i=0;i<50;i++){
    if(x===600){
    x=0;
    y+=40;
}
    const myColor=colors[Math.floor(Math.random()*6)];
    teglak[i]=new Cube(myColor,new Image(),x,y);
    teglak[i].filename.src="ZQU5X5/"+myColor+".png";
    x+=60;
}
}
    function addNewRow(){
    for(let i=teglak.length-1;i>=0;i--){
    if(teglak[i]===null){
    teglak[i+10]=null;
}else{
    teglak[i+10]=teglak[i];
}
}
    let x=0;
    let y=0;
    for(let i=0;i<10;i++){
    const myColor=colors[Math.floor(Math.random()*6)];
    teglak[i]=new Cube(myColor,new Image(),x,y);
    teglak[i].filename.src="ZQU5X5/"+myColor+".png";
    x+=60;
}
}
    function stabilizeCubes(){
    let y=0;
    let x=0;

    for(let i=0;i<teglak.length;i++){
    if(x===600){
    x=0;
    y+=40;
}

    if(teglak[i]!==null && teglak[i]!==undefined){
    teglak[i].X=x;
    teglak[i].Y=y;
}else if(teglak[i]===null){
    let z=i;
    for(let j=z+10;j<teglak.length;j+=10){
    if(teglak[j]!==null&&teglak[j]!==undefined){
    let temp = teglak[j];
    console.log(teglak[j]);
    teglak[z]=temp
    teglak[j]=null;
    z+=10;
}
}


}
    x+=60;
}
}
    function animate() {
    requestID=requestAnimationFrame(animate);
    // minden frameben meghivom a draw fuggvenyt
    draw();
}

    // az egyes kirajzolasokert felelos fuggveny
    function draw() {
    stabilizeCubes();
    drawCubes(teglak);
    drawSobics();
}


    // repulogep kirajzolasa
    function drawCubes(cube) {
    // a hatter mindenkori ujrarajzolasa
    drawBackground();
    drawRectangle();
    for(let i=0;i<cube.length;i++){
    if(cube[i]===undefined){
    cube[i]=null;
}
}
    for(let i=0;i<cube.length;i++){
    if(cube[i]!==null){
    ctx.drawImage(cube[i].filename, cube[i].X, cube[i].Y, 58, 38);
}
}
}

    // hatter megrajzolasa
    function drawBackground() {
    ctx.fillStyle = "#eac87a";
    ctx.fillRect(0, 0, c.width, c.height);
}

    // kukac kirajzolasa
    function drawSobics() {
    ctx.drawImage(sobicsImg, sobicsX, sobicsY, 60, 100);
    if(sobicsHand!==null){
    ctx.drawImage(sobicsHand.filename,sobicsX,sobicsY+40,60,20);
}
}

    // kukac kirajzolasa

    function soibicsMouseMove(ev) {
    // uegyelni kell arra, hogy az adott HTML elemnek (CANVAS) figyelembe vegyunk a pozicioit is,
    // amikor meghatarozzuk az egerpoziciot, mielott azt atadjuk a kukact x poziciojanak es vizsgaljuk, hogy vasznon belul vagyunk-e
    var rect = c.getBoundingClientRect();
    var mouseX = ev.clientX - rect.left;
    if (mouseX > 0 && mouseX < c.width-20) {
    sobicsX=Math.floor(mouseX / 60) * 60;
    // uj poziciot adunk meg, tehat szukseges a kukac ujrarajzolasa
    sobicsColumn=sobicsX/60;
    drawSobics();
}
}

    function drawRectangle(){
    ctx.fillStyle = "#f8e5cd";
    ctx.fillRect(sobicsX,0 , 60, c.height);
}

    function removeCube(cube) {
    let i=teglak.indexOf(cube);
    teglak[i]=null;

}
