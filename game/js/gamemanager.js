
var ShipSpeed = .1, pause = false, CrewSwitchingEnabled = true, crew = 8, crewused = 0;

var Gold = 0;

function CheckPassedPOI(){
  if(miniProgressShip.eventPassed){
    eventLoc = miniProgressShip.lastYard / 100;

    if(LOADEDLEVEL.POI.includes(eventLoc-1)){
      debug.log("event location");
      EVENTWINDOW.showEvent(DrawEvent(false, true));
      pause = true;
    } else {
      debug.log("change location " + eventLoc + "/" + miniProgressShip.lastYard + "/" + miniProgressShip.yards);
      debug.log(LOADEDLEVEL.POI);
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

function IncreaseGold(val){
  debug.log("Gold! Always believe in you're soul. GOLD: " + Gold + ", NOW: " + (Gold+val));
  Gold += val;
}
