//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(1280, 960);
document.body.appendChild(renderer.view);

loader
  .add("res/main.json")
  .add("res/backs/BackgroundSkies.png")
  .add("res/backs/PixelatedBackgroundSkies.png")
  .load(setup);

//Define any variables that are used in more than one function
var Tex_Main, state = play;
function setup() {
  state = play;

  Tex_Main = PIXI.loader.resources["res/main.json"].textures;

  loadMainGame();

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

  Sail();

}
