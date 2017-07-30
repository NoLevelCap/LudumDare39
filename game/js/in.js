//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(1280, 960);
document.body.appendChild(renderer.view);

loader
  .add("res/main.json")
  .add("res/backs/BackgroundSkies.png")
  .add("res/backs/PixelatedBackgroundSkies.png")
  .add("EventData", "dats/events.txt")
  .load(setup);

//Define any variables that are used in more than one function
var Tex_Main, state = play, MAP;
function setup() {
  state = play;

  Tex_Main = PIXI.loader.resources["res/main.json"].textures;

  loadEvents();
  loadMainGame();

  MAP = new Map(stage);

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
    enemyHealthView.text = "Enemy health: " + enemyHealth;
  }

  healthView.text = "Ship health: " + shipHealth;
  goldValue.text = "Gold: " + gold;

  if (gold < 0)
  {
    gold = 0;
  }

  if (shipHealth <= 0 || crew <= 0)
  {
    gameOver = true;
    pause = true;
  }

  if (gameOver)
  {
    usersShip.ShipContainer.y += 2;
    if (usersShip.ShipContainer.y > 400 && usersShip.ShipContainer.y < 403)
    {
      EVENTWINDOW.showEvent(new gameOverMessage());
    }
  }

  war.visible = warButtonsVisible();
}
