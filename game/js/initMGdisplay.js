//This file loads the main game display

var MainGameContainer, SHIPVIEWER, SHIPROGRESS, SHIPMANAGMENT,
animatables = new Array();

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

  hullPB = new PowerBar(container, 140, 620, "HULL");
  cannonPB = new PowerBar(container, 140, 700, "CANNON");
  sailsPB = new PowerBar(container, 140, 780, "SAILS");
  cookingPB = new PowerBar(container, 140, 860, "COOKING");
}

function Ship(container){
  this.graphics = new Graphics();
  this.graphics.beginFill(0xFFFFFF);
  this.graphics.drawRect(20, 20, 960, 560);
  container.addChild(this.graphics);
}

function PowerBar(container, x, y, name){
  this.powerbars = new Array();

  for (var i = 0; i < 12; i++) {
    this.powerbars[i] = new bar(this, x + (82*i) , y, i);
    container.addChild(this.powerbars[i].Sprite);
    animatables.push(this.powerbars[i]);
    /*graphics = new Graphics();
    graphics.beginFill(0xF0FF0F);
    graphics.drawRect(x + (82*i) , y, 72, 48);
    container.addChild(graphics);*/
  };

  this.loadPower = function(id){
      id++;
      for (var i = 0; i < id; i++) {
        this.powerbars[i].setActive(true);
      }

      for (var i = id; i < 12; i++) {
        this.powerbars[i].setActive(false);
      }
  };

  text = new PIXI.Text(name,{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'right'});
  text.x = x - text.width - 16;
  text.y = y + text.height / 2;
  container.addChild(text);
}

function bar(p, x, y, id, active){
  this.active = active;
  this.Sprite = new Sprite(Tex_Main['power.png']);
  this.Sprite.x = x;
  this.Sprite.y = y;
  this.Sprite.interactive = true;
  this.Sprite.p = this;
  this.parent = p;

  this.Person_Sprite = new Sprite(Tex_Main['person.png']);
  this.Person_Sprite.x = (this.Sprite.width / 2) - (this.Person_Sprite.width /2);
  this.Person_Sprite.y = ((this.Sprite.height / 2) - this.Person_Sprite.height) + 12 ;
  this.Person_Sprite.visible = this.active;
  this.Sprite.addChild(this.Person_Sprite);

  this.floating = false;
  this.sy = 0;

  this.Sprite
    .on('mouseover', function(){
      this.p.floating = true;
      this.p.sy = this.y;
    })
    .on('mouseout', function(){
      this.p.floating = false;
      this.y = this.p.sy;
    })
    .on('mouseup', function(){
      this.p.parent.loadPower(id);
    });

  this.animate = function(){
    if(this.floating){
        this.Sprite.y += 0.4 * Math.sin(Date.now() / 64);
    }
  }

  this.setActive = function(active){
    this.active = active;
    this.Person_Sprite.visible = active;
  }
}
