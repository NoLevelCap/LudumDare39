
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
  this.POI = getPoints(type);
  this.type = type;
}

function InitLevel(){
  if(visitNode == null){
    createMessage("Please select a location to travel too", "Click on the circle\nnext to the scored circle");
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
    hullPB.submitPower();
    cannonPB.submitPower();
    sailsPB.submitPower();
    cookingPB.submitPower();

    MAP.hideMap();

    currentNode = visitNode;
    currentNode.setVisted();
    visitNode = null;

    LOADEDLEVEL = new Level(currentNode.type);
    SHIPROGRESS.loadDisplay();
}

function EndLevel(){
  pause = true;
  MAP.showMap();
  SwitchCover(true);
  if(LOADEDLEVEL.type == getLevelType("difficult")){
    prize = getRandomInt(50, 101);
    IncreaseGold(prize);
    EVENTWINDOW.showEvent(new emptyEvent("You find a cache of treasure!", "You get " + prize + " gold."));
  }
}
