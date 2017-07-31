
var Type = {
  difficult : 5,
  peaceful : 1,
  normal : 3
}

function getLevelType(key) {
    return Type[key];
}

function getPoints(type){
  ab = new Array();
  for (var i = 0; i < type; i++) {
    do{
      b = getRandomInt(0, 15);
    }while(ab.includes(b));
    ab.push(b);
  }
  return ab;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Level(type){
  this.POI = getPoints(type).sort();
  this.type = type;
  this.difficultyModifier = 0.5; //1 = hardest, 0 = easiest
  this.shipSpeedModifier = 0.5;

  if(this.type == getLevelType("peaceful")){
    this.difficultyModifier = 0.2;
    this.shipSpeedModifier = 1.5;
    TUTMANAGER.loadMessage("peacefulStart");
  } else if(this.type == getLevelType("difficult")){
    this.difficultyModifier = 1;
    TUTMANAGER.loadMessage("difficultStart");
  }
}

function InitLevel(){
  if(visitNode == null){
    createMessage("Please select a location to travel to", "Click on the circle\nnext to the scored circle");
    return;
  }

  if(crewused == 0){
    createMessage("You could select some crew", "Click on the checkboxes\nto assign crew to areas of the ship");
    return;
  }
    console.log("INIT LEVEL")
    pause = false;
    miniProgressShip.yards = 0;
    miniProgressShip.lastYard = 0;
    SwitchCover(false);

    MAP.hideMap();

    currentNode = visitNode;
    currentNode.setVisted();
    visitNode = null;

    MAP.portName.text = drawRandomArray(PortNames)+"\nMarket";
    MAP.portName.position.set(150-MAP.portName.width/2, -MAP.portName.height - 10);

    LOADEDLEVEL = new Level(currentNode.type);

    hullPB.submitPower();
    cannonPB.submitPower();
    sailsPB.submitPower();
    cookingPB.submitPower();

    SHIPROGRESS.loadDisplay();
}

function EndLevel(){
  pause = true;

  if(currentNode.isFinalNode()){
    console.log("final node!!");
    submitScore(new ScoreInfo(shipName, areaname, Gold, Math.floor((Date.now() - startTime)/1000), crew));
  }

  MAP.showMap();
  SwitchCover(true);
  if(LOADEDLEVEL.type == getLevelType("difficult")){
    prize = getRandomInt(50, 101);
    IncreaseGold(prize);
    EVENTWINDOW.showEvent(new emptyEvent("You find a cache of treasure!", "You get " + prize + " gold."));
  }
}
