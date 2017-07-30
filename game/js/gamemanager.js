
var ShipSpeed = .1, pause = false, CrewSwitchingEnabled = true, crew = 8, crewused = 0;

function CheckPassedPOI(){
  if(miniProgressShip.eventPassed){
    eventLoc = miniProgressShip.lastYard / 100;

    if(LOADEDLEVEL.POI.includes(eventLoc-1)){
      console.log("event location");
      pause = true;
    } else {
      console.log("change location " + eventLoc + "/" + miniProgressShip.lastYard + "/" + miniProgressShip.yards);
      console.log(LOADEDLEVEL.POI);
      if(CrewSwitchingEnabled != true){
        SwitchCover(true);
      }
    }

    miniProgressShip.eventPassed = false;
  }
}

function Sail(){
  if(!pause){
    miniProgressShip.increaseYards(ShipSpeed);
    scrollingBackground.x = -miniProgressShip.yards * 2.1;
    CheckPassedPOI();
  }

  //console.log(miniProgressShip);
}

function SwitchCover(crew){
  CrewSwitchingEnabled = crew;
  if(CrewSwitchingEnabled){
    cover.visible = false;
  } else {
    cover.visible = true;
  }
}
