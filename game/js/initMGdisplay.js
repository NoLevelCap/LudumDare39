//This file loads the main game display

var MainGameContainer, SHIPVIEWER, SHIPROGRESS, SHIPMANAGMENT, LOADEDLEVEL,
miniProgressShip, scrollingBackground
animatables = new Array();

function loadMainGame(){
  MainGameContainer = new Container();
  stage.addChild(MainGameContainer);

  loadLevelData();

  loadShipViewer();
  loadShipProgress();
  loadShipManagement();
}

function loadLevelData(){
  LOADEDLEVEL = new Level();
}

function loadShipViewer(){
  shipViewer = new Container();
  MainGameContainer.addChild(shipViewer);

  SHIPVIEWER = new ShipViewer(shipViewer);
}

function loadShipProgress(){
  shipProgress = new Container();
  shipProgress.y = 480;
  MainGameContainer.addChild(shipProgress);

  SHIPROGRESS = new ShipProgress(shipProgress);
}

function loadShipManagement(){
  shipManagement = new Container();
  MainGameContainer.addChild(shipManagement);

  SHIPMANAGMENT = new ShipManagment(shipManagement);
}

function ShipViewer(container){
  scrollingBackground = new Sprite(PIXI.loader.resources["res/backs/BackgroundSkies.png"].texture)
  scrollingBackground.setTransform(0, 0);
  container.addChild(scrollingBackground);

  usersShip = new Ship(container, 20, 20);

  waves = new Container();
  container.addChild(waves);



  for (var i = 0; i < 32; i++) {
    Wave_1 = new Wave(68*i - 24,500,96,96);
    //Wave_1 = new Wave(0,0,96,96);
    waves.addChild(Wave_1.Sprite);
  }


  war = new Container();
  war.visible = false;
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
  graphics.drawRect(0, 0, 1280, 100);
  container.addChild(graphics);

  progressbar = new Sprite(PIXI.loader.resources["res/backs/PixelatedBackgroundSkies.png"].texture)
  progressbar.setTransform(0, 10);
  progressbar.height = 80;
  container.addChild(progressbar);

  progressline = new Sprite(Tex_Main['break.png']);
  progressline.x = 20;
  progressline.y = 44;
  progressline.width = 1240;
  progressline.height = 12;
  container.addChild(progressline);




  for (var i = 0; i < 15; i++) {
    if(!LOADEDLEVEL.POI.includes(i)){
      sp = new Sprite(Tex_Main['circle.png']);
      sp.x = 50 + 16 + i * 80;
      sp.y = 22 + 16;
      sp.width = 24;
      sp.height = 24;
    } else {
      sp = new Sprite(Tex_Main['diamond.png']);
      sp.x = 50 + 8 + i * 80;
      sp.y = 22 + 12;
      sp.width = 32;
      sp.height = 32;
    }

    container.addChild(sp);
  }

  miniProgressShip = new MiniShip(container, 20, 52, 48, 28);
}

function ShipManagment(container){
  sp = new Sprite(Tex_Main['UIBack.png']);
  sp.x = -10;
  sp.y = 580;
  container.addChild(sp);

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

function MiniShip(container, x, y, w, h){
  this.yards = 0;
  this.eventPassed = false;
  this.lastYard = 0;

  this.Sprite = new Sprite(Tex_Main['Ship.png']);
  this.Sprite.x = x;
  this.oX = x;
  this.Sprite.y = y;
  this.Sprite.width = w;
  this.Sprite.height = h;
  this.Sprite.anchor = new PIXI.Point(0.5, 1);
  container.addChild(this.Sprite);

  this.animate = function(){
    this.Sprite.rotation = .035 * Math.sin((Date.now()*0.52) / 256);
    //this.Sprite.rotation += .01;
  }

  this.increaseYards = function(inYards){
    this.yards += inYards;

    if(this.yards > this.lastYard + 100 && this.eventPassed == false){
      this.eventPassed = true;
      this.lastYard += 100;
    }

    this.Sprite.x = -5 + (80*(this.yards/100));
  }

  animatables.push(this);
}

function Ship(container, x, y){
  this.ShipContainer = new Container();
  this.ShipContainer.x = x;
  this.ShipContainer.y = y;
  container.addChild(this.ShipContainer);

  this.Sprite = new Sprite(Tex_Main['Ship.png']);
  this.Sprite.x = 480;
  this.Sprite.y = 460;
  this.Sprite.width = 960;
  this.Sprite.height = 560;
  this.Sprite.anchor = new PIXI.Point(0.5, 1);
  this.ShipContainer.addChild(this.Sprite);

  this.animate = function(){
    this.Sprite.rotation = .035 * Math.sin(Date.now() / 256);
    //this.Sprite.rotation += .01;
  }

  animatables.push(this);
}

function Wave(x, y, w, h){
  this.Sprite = new Sprite(Tex_Main['SeaWaves.png']);
  this.Sprite.x = x;
  this.Sprite.y = y;
  this.Sprite.width = w;
  this.Sprite.height = h;
  this.Sprite.anchor = new PIXI.Point(0.5, 1);

  this.animate = function(){
    this.Sprite.rotation = .2 * Math.sin(Date.now() / 128);
    //this.Sprite.rotation += .01;
  }

  animatables.push(this);
}

function PowerBar(container, x, y, name){
  this.powerbars = new Array();
  this.value = 0;

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
      this.value = id;
      for (var i = 0; i < id; i++) {
        this.powerbars[i].setActive(true);
      }

      for (var i = id; i < 12; i++) {
        this.powerbars[i].setActive(false);
      }
  };

  text = new PIXI.Text(name,{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'right'});
  text.x = x - text.width - 2;
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
