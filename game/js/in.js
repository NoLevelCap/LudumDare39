//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(1280, 960, {resolution: .8});
document.body.appendChild(renderer.view);

loader
  .add("res/main.json")
  .add("res/backs/BackgroundSkies.png")
  .add("res/backs/PixelatedBackgroundSkies.png")
  .add("EventData", "dats/events.txt")
  .add("Ports", "dats/portnames.txt")
  .add("Ships", "dats/shipnames.txt")
  .load(setup);

//Define any variables that are used in more than one function
var Tex_Main, state = play;
var MAP, SOUNDMANAGER, ShipNames, PortNames;
function setup() {
  state = play;

  SOUNDMANAGER = new SoundManager();

  Tex_Main = PIXI.loader.resources["res/main.json"].textures;

  ShipNames = loadDataArray("Ships");
  console.log(ShipNames);

  PortNames = loadDataArray("Ports");
  console.log(PortNames);

  loadEvents();
  loadMainGame();

  MAP.showMap();

  loadStartMenu();

  //get the stage details
  Console.log(stage);
  //Start the game loop
  gameLoop();
}
function gameLoop(){
  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);
  //Update the current game state:
  state();
  //Render the stage
  renderer.render(stage);
}

function play() {
  for (var i = 0; i < animatables.length; i++) {
    animatables[i].animate();
  }

  if (!inCombat)
  {
    Sail();
    enemyHealthView.visible = false;
  }
  else {
    combatManager();
    enemyHealthView.visible = true;
    enemyHealthView.text = AIShip.shipName + " health: " + enemyHealth;
    enemyHealthView.x = 1280 - enemyHealthView.width - 10;
  }

  healthView.text = shipName + " health: " + shipHealth + "/" + maxHealth;
  goldValue.text = "Gold: " + Gold;
  if (Gold < 0)
  {
    Gold = 0;
  }

  if (shipHealth <= 0 || crew <= 0)
  {
    gameOver = true;
    pause = true;
  }

  maxHealth = Math.floor(100 + ((hullPB.value / 12.0) * 100));
  if (shipHealth > maxHealth)
  {
    shipHealth = maxHealth;
  }

  if (gameOver)
  {
    usersShip.ShipContainer.y += 2;
    if (usersShip.ShipContainer.y > 400 && usersShip.ShipContainer.y < 403)
    {
      submitScore(new ScoreInfo(shipName, areaname, Gold, Math.floor((Date.now() - startTime)/1000), crew, 0));
      EVENTWINDOW.showEvent(new gameOverMessage());
    }
  }

  MAP.repairTxt.text = (100 - shipHealth) + " gold";
  MAP.buyCrewTxt.text = "40 gold";

  war.visible = warButtonsVisible();
}
