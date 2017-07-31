
function getPoints(){
  ab = new Array();
  ab.push(getRandomInt(0, 5));
  ab.push(getRandomInt(5, 10));
  ab.push(getRandomInt(10, 15));
  return ab;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Level(){
  this.POI = getPoints();
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

    pause = false;
    miniProgressShip.yards = 0;
    SwitchCover(false);
    hullPB.submitPower();
    cannonPB.submitPower();
    sailsPB.submitPower();
    cookingPB.submitPower();

    MAP.hideMap();

    currentNode = visitNode;
    currentNode.setVisted();
    visitNode = null;

    LOADEDLEVEL = new Level();
    SHIPROGRESS.loadDisplay();
}

function EndLevel(){
  pause = true;
  MAP.showMap();
  SwitchCover(true);
}
