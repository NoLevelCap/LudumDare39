
var ShipSpeed = .1, pause = false;

function CheckPassedPOI(){
  if(miniProgressShip.eventPassed){
    eventLoc = miniProgressShip.lastYard / 100;

    if(LOADEDLEVEL.POI.includes(eventLoc-1)){
      console.log("event location");
      pause = true;
    } else {
      console.log("change location " + eventLoc + "/" + miniProgressShip.lastYard + "/" + miniProgressShip.yards);
      console.log(LOADEDLEVEL.POI);
    }

    miniProgressShip.eventPassed = false;
  }
}

function Sail(){
  if(!pause){
    miniProgressShip.increaseYards(ShipSpeed);
    scrollingBackground.x = -miniProgressShip.yards * 0.5;
    CheckPassedPOI();
  }

  //console.log(miniProgressShip);
}
