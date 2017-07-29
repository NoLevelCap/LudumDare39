//This file loads the main game display

var MainGameContainer, SHIPVIEWER, SHIPROGRESS, SHIPMANAGMENT;

function loadMainGame(){
  MainGameContainer = new Container();
  stage.addChild(MainGameContainer);

  loadShipViewer();
  loadShipProgress();
  loadShipManagement();
}

function loadShipViewer(){
  shipViewer = new Container();
  MainGameContainer.addChild(shipViewer);

  SHIPVIEWER = new ShipViewer(shipViewer);
}

function loadShipProgress(){
  shipProgress = new Container();
  MainGameContainer.addChild(shipProgress);

  SHIPROGRESS = new ShipProgress(shipProgress);
}

function loadShipManagement(){
  shipManagement = new Container();
  MainGameContainer.addChild(shipManagement);

  SHIPMANAGMENT = new ShipManagment(shipManagement);
}

function ShipViewer(container){
  graphics = new Graphics();
  graphics.beginFill(0xFFFF00);
  graphics.drawRect(0, 0, 1280, 480);
  container.addChild(graphics);

  usersShip = new Ship(container);

  war = new Container();
  container.addChild(war);

  fire_button = new Graphics();
  fire_button.beginFill(0x000000);
  fire_button.drawRect(12, 340, 128, 128);
  war.addChild(fire_button);

  flee_button = new Graphics();
  flee_button.beginFill(0x000000);
  flee_button.drawRect(24 + 128, 340, 128, 128);
  war.addChild(flee_button);

  flank_button = new Graphics();
  flank_button.beginFill(0x000000);
  flank_button.drawRect(12*3 + 128 * 2, 340, 128, 128);
  war.addChild(flank_button);
}

function ShipProgress(container){
  graphics = new Graphics();
  graphics.beginFill(0xFF0000);
  graphics.drawRect(0, 480, 1280, 100);
  container.addChild(graphics);

  progressbar = new Graphics();
  progressbar.beginFill(0xFF00F9);
  progressbar.drawRect(10, 490, 1260, 80);
  container.addChild(progressbar);
}

function ShipManagment(container){

  graphics = new Graphics();
  graphics.beginFill(0xFF00FF);
  graphics.drawRect(0, 580, 1280, 380);
  container.addChild(graphics);

  graphics = new Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(1140, 600, 120, 40);
  container.addChild(graphics);

  graphics = new Graphics();
  graphics.beginFill(0xFFFFFF);
  graphics.drawRect(1140, 665, 120, 40);
  container.addChild(graphics);

  pb = new PowerBar(container, 140, 620);
  pb = new PowerBar(container, 140, 700);
  pb = new PowerBar(container, 140, 780);
  pb = new PowerBar(container, 140, 860);
}

function Ship(container){
  this.graphics = new Graphics();
  this.graphics.beginFill(0xFFFFFF);
  this.graphics.drawRect(20, 20, 960, 560);
  container.addChild(this.graphics);
}

function PowerBar(container, x, y){


  for (var i = 0; i < 12; i++) {
    graphics = new Graphics();
    graphics.beginFill(0xF0FF0F);
    graphics.drawRect(x + (82*i) , y, 72, 48);
    container.addChild(graphics);
  }

  text = new PIXI.Text('_NAME_',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'right'});
  text.x = x - text.width - 16;
  text.y = y + text.height / 2;
  container.addChild(text);
}
