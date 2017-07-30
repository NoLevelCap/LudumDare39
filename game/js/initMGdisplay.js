//This file loads the main game display

var MainGameContainer, SHIPVIEWER, SHIPROGRESS, SHIPMANAGMENT, LOADEDLEVEL, EVENTWINDOW,
miniProgressShip, scrollingBackground, hullPB, cannonPB, sailsPB, cookingPB, shipHealth, inCombat, war,
cover, crewValue,
animatables = new Array();

function loadMainGame(){
  MainGameContainer = new Container();
  stage.addChild(MainGameContainer);

  shipHealth = 100;

  loadLevelData();

  loadShipViewer();
  loadShipProgress();
  loadShipManagement();
  loadEventWindow();

  initCombat();
  inCombat = true;

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

function loadEventWindow(){
  eventWindow = new Container();
  eventWindow.x = 640 - 320;
  eventWindow.y = 480 - 400;
  MainGameContainer.addChild(eventWindow);

  EVENTWINDOW = new EventDisplay(eventWindow);
  eventWindow.visible = false;
}

function ShipViewer(container){
  scrollingBackground = new Extras.TilingSprite(PIXI.loader.resources["res/backs/BackgroundSkies.png"].texture, 8192, 480);
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

//  fire_button = new Graphics();
  fire_button = new warButton(12, 340, Fire);
  war.addChild(fire_button.container);
  fire_button.container.addChild(new Sprite(Tex_Main['Fire_Icon.png']))

//  flee_button = new Graphics();
  flee_button = new warButton(24 + 128, 340, Flee);
  war.addChild(flee_button.container);
  flee_button.container.addChild(new Sprite(Tex_Main['Flee_Icon.png']))

//  flank_button = new Graphics();
  flank_button = new warButton(36 + 256, 340, Flank);
  war.addChild(flank_button.container);
  flank_button.container.addChild(new Sprite(Tex_Main['Flank_Icon.png']))

}

function warButton(x, y, func){
  console.log("button created");
  this.baseSprite = new Sprite(Tex_Main['Circular_Button_Normal.png']);
  this.container = new Container();
  this.container.addChild(this.baseSprite);
  this.container.x = x;
  this.container.y = y;
  this.container.p = this;
  this.container.interactive = true;

  this.mouseHover = false;
  this.mouseDown = false;

  this.func = func;

  this.container
    .on('mouseover', function(){
      this.p.mouseHover = true;
    })
    .on('mouseout', function(){
      this.p.mouseHover = false;
    })
    .on('mouseup', function(){
      this.p.mouseDown = false;
      this.p.mouseHover = true;
      this.p.func();
    })
    .on('mousedown', function(){
      this.p.mouseDown = true;
    });

    this.animate = function(){
      if (this.mouseDown)
      {
        this.baseSprite.texture = Tex_Main['Circular_Button_MouseDown.png'];
      }
      else {
        if (this.mouseHover)
        {
          this.baseSprite.texture = Tex_Main['Circular_Button_Hover.png'];
        }
        else {
          this.baseSprite.texture = Tex_Main['Circular_Button_Normal.png'];
        }
      }
//      this.Sprite = this.baseSprite;
    }

    animatables.push(this);
}

function startWar()
{

}

function ShipProgress(container){

  progressbar = new Sprite(PIXI.loader.resources["res/backs/PixelatedBackgroundSkies.png"].texture)
  progressbar.setTransform(0, 10);
  progressbar.height = 80;
  container.addChild(progressbar);

  for (var i = 0; i < 32; i++) {
    embossTop = new Sprite(Tex_Main['Trim.png']);
    embossTop.x = i * 40;
    embossTop.y = 0;
    container.addChild(embossTop);
  }

  for (var i = 0; i < 32; i++) {
    embossTop = new Sprite(Tex_Main['Trim.png']);
    embossTop.x = i * 40;
    embossTop.y = 90;
    container.addChild(embossTop);
  }

  progressline = new Sprite(Tex_Main['undertrack.png']);
  progressline.x = 20;
  progressline.y = 44;
  progressline.width = 1240;
  progressline.height = 12;
  container.addChild(progressline);

  sp = new Sprite(Tex_Main['circle.png']);
  sp.x = 8;
  sp.y = 22 + 16;
  sp.width = 24;
  sp.height = 24;
  container.addChild(sp);

  sp = new Sprite(Tex_Main['Start.png']);
  sp.x = 4;
  sp.y = 22 + 12;
  sp.width = 32;
  sp.height = 32;
  container.addChild(sp);

  sp = new Sprite(Tex_Main['End.png']);
  sp.x = 50 + 15 * 80;
  sp.y = 22 + 12;
  sp.width = 32;
  sp.height = 32;
  container.addChild(sp);

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

  crewValue = new PIXI.Text("Crew Usage:",{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'right'});
  crewValue.x = 1120;
  crewValue.y = 600;
  container.addChild(crewValue);

  crewValue = new PIXI.Text(crewused + "/" + crew,{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'center'});
  crewValue.x = 1170;
  crewValue.y = 640;
  container.addChild(crewValue);


  bb = new button("Submit", Tex_Main['Button_UI.png'], 1120, 860, 144, 48, function(){ pause = false; SwitchCover(false); hullPB.submitPower(); cannonPB.submitPower(); sailsPB.submitPower(); cookingPB.submitPower()});
  container.addChild(bb.Sprite);

  hullPB = new PowerBar(container, 140, 620, "HULL");
  cannonPB = new PowerBar(container, 140, 700, "CANNON");
  sailsPB = new PowerBar(container, 140, 780, "SAILS", function(){ ShipSpeed = 0.1 + (this.value/12) * 1.9;});
  cookingPB = new PowerBar(container, 140, 860, "COOKING", function() { karma = 0.2 + (this.value/12) * 0.6;});

  cover = new Sprite(Tex_Main['break.png']);
  cover.x = -10;
  cover.y = 580;
  cover.width = 1300;
  cover.height = 600;
  cover.visible = false;
  container.addChild(cover);
}

function EventDisplay(container){
    this.container = container;

    this.currentEvent;

    back = new Sprite(Tex_Main['break.png']);
    back.x = 0;
    back.y = 0;
    back.width = 640;
    back.height = 320;
    container.addChild(back);

    for (var i = 0; i < 16; i++) {
      embossTop = new Sprite(Tex_Main['Trim.png']);
      embossTop.x = i * 40;
      embossTop.y = -10;
      container.addChild(embossTop);
    }

    for (var i = 0; i < 16; i++) {
      embossTop = new Sprite(Tex_Main['Trim.png']);
      embossTop.x = i * 40;
      embossTop.y = 320;
      container.addChild(embossTop);
    }

    this.eventSpeech = new PIXI.Text("This is where the event \n information goes. \n another line",{fontFamily : 'Permanent Marker', fontSize: 32, fill : 0x000000, align : 'center'});
    this.eventSpeech.x = 320 - this.eventSpeech.width/2;
    this.eventSpeech.y = 160 - this.eventSpeech.height;
    container.addChild(this.eventSpeech);

    this.eventDesc = new PIXI.Text("This is where the event \n information goes.",{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'center'});
    this.eventDesc.x = 320 - this.eventDesc.width/2;
    this.eventDesc.y = this.eventSpeech.y + this.eventSpeech.height + 40;
    container.addChild(this.eventDesc);

    this.showEvent = function(event){
      this.currentEvent = event;

      this.container.visible = true;
      this.eventSpeech.text = event.text;
      this.eventSpeech.x = 320 - this.eventSpeech.width/2;
      this.eventSpeech.y = 160 - this.eventSpeech.height;

      this.eventDesc.text = event.final;
      this.eventDesc.x = 320 - this.eventDesc.width/2;
      this.eventDesc.y = this.eventSpeech.y + this.eventSpeech.height + 40;
    }

    this.hideEvent = function(){
      this.currentEvent.fire();
      this.container.visible = false;
    }

    bb = new button("", Tex_Main['End.png'], 640 - 64 - 6, 320 - 64 - 6, 64, 64, function(){EVENTWINDOW.hideEvent();});
    container.addChild(bb.Sprite);
    debug.log(bb);
}

function MiniShip(container, x, y, w, h){
  this.yards = 0;
  this.eventPassed = false;
  this.lastYard = 0;

  this.Sprite = new Sprite(Tex_Main['SmallBoat.png']);
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
    if(this.Sprite.x < this.oX){
      this.Sprite.x = this.oX;
    }
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

function enemyShip(container, x, y){
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

function PowerBar(container, x, y, name, effect){
  this.powerbars = new Array();
  this.value = 0;
  this.temp_value = 0;
  this.effect = effect;

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
      if(id < 0){
        id = 0;
      }
      if(id >= 12){
        id = 12;
      }

      if(id == 1 && this.powerbars[0].active && this.temp_value < 2){
        id--;
      }

      console.log("Crew Data: " + crewused + "/" + crew + ":" + id);
      if(crew < 0){
        id = 0;
      } else if(crewused + (id - this.temp_value) > crew){
        id = (crew - crewused) + this.temp_value;
      }

      this.temp_value = id;

      for (var i = 0; i < id; i++) {
        if(!this.powerbars[i].active){
          this.powerbars[i].setActive(true);
          crewused++;
        }
      }

      for (var i = id; i < 12; i++) {
        if(this.powerbars[i].active){
          this.powerbars[i].setActive(false);
          crewused--;
        }
      }

      crewValue.text = crewused + "/" + crew;
  };

  this.changePower = function(val){
    if(val != 0){
      this.loadPower(this.temp_value + val);
    }
  }

  this.submitPower = function(){
    this.value = this.temp_value;
    if(this.effect != null){
      this.effect();
    }

  }

  text = new PIXI.Text(name,{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'right'});
  text.x = x - text.width - 2;
  text.y = y + text.height / 2;
  container.addChild(text);
}

function button(name, texture, x, y, w, h, func){
  console.log("button created");
  this.Sprite = new Sprite(texture);
  this.Sprite.x = x;
  this.Sprite.y = y;
  this.Sprite.width = w;
  this.Sprite.height = h;
  this.Sprite.p = this;
  this.Sprite.interactive = true;

  text = new PIXI.Text(name,{fontFamily : 'Permanent Marker', fontSize: 24, fill : 0x000000, align : 'right'});
  text.x = text.width/2 - 8;
  text.y = text.height/2 - 8;
  this.Sprite.addChild(text);

  this.func = func;

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
      this.p.func();
    });

    this.animate = function(){
      if(this.floating){
          this.Sprite.y += 0.4 * Math.sin(Date.now() / 64);
      }
    }

    animatables.push(this);
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
      this.p.parent.loadPower(id+1);
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
